import { Component, OnInit } from '@angular/core';
import { time } from 'console';
import * as echarts from 'echarts';

import * as $ from 'jquery';
import { DATE, MONTH } from 'ngx-bootstrap/chronos/units/constants';
import { DayPickerComponent } from 'ngx-bootstrap/datepicker';
import { StockService } from 'src/app/core/services/stock.service';

console.log($);

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  repType: string = 'SP500';
  constructor(private service: StockService) { }

  ngOnInit(): void {
    this.bindReport();
  }

  bindReport() {

    var ROOT_PATH = 'https://echarts.apache.org/examples';
    var app: any = {};
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    interface TreeNode {
      name: string;
      id: string;
      value: number[];

      children?: TreeNode[];
    }

    myChart.showLoading();

    const household_america_2012 = 113616229;

    this.service.GetHeatMapData(this.repType).subscribe(response => {
      const result = response;
      myChart.hideLoading();

      const visualMin = -100;
      const visualMax = 100;
      const visualMinBound = -40;
      const visualMaxBound = 40;

      convertData(result);

      function convertData(originList: TreeNode[]) {
        let min = Infinity;
        let max = -Infinity;

        for (let i = 0; i < originList.length; i++) {
          let node = originList[i];
          if (node) {
            let value = node.value;
            value[2] != null && value[2] < min && (min = value[2]);
            value[2] != null && value[2] > max && (max = value[2]);
          }
        }

        for (let i = 0; i < originList.length; i++) {
          let node = originList[i];
          if (node) {
            let value = node.value;

            // Scale value for visual effect
            if (value[2] != null && value[2] > 0) {
              value[3] = echarts.number.linearMap(
                value[2],
                [0, max],
                [visualMaxBound, visualMax],
                true
              );
            } else if (value[2] != null && value[2] < 0) {
              value[3] = echarts.number.linearMap(
                value[2],
                [min, 0],
                [visualMin, visualMinBound],
                true
              );
            } else {
              value[3] = 0;
            }

            if (!isFinite(value[3])) {
              value[3] = 0;
            }

            if (node.children) {
              convertData(node.children);
            }
          }
        }
      }

      function isValidNumber(num: number) {
        return num != null && isFinite(num);
      }
      function getTodayYYYYMMDD(): number {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Note: month is zero-based in JavaScript Date object
        const day = today.getDate();
    
        const yyyymmdd = year * 10000 + month * 100 + day;
    
        return yyyymmdd;
    }
    function getSixMonthsBackYYYYMMDD(): number {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Note: month is zero-based in JavaScript Date object
        const day = today.getDate();
    
        let newMonth = month - 4;
        let newYear = year;
    
        if (newMonth <= 0) {
            newMonth += 12;
            newYear--;
        }
    
        const yyyymmdd = newYear * 10000 + newMonth * 100 + day;
    
        return yyyymmdd;
    }
    const todayYYYYMMDD = getTodayYYYYMMDD();
    const sixMonthsBackYYYYMMDD = getSixMonthsBackYYYYMMDD();
      myChart.setOption(
        (option = {
          title: {
            left: 'center',
            text: this.repType + ' Heatmap',
            subtext: 'Stock Price Change > 0: green; Stock Price Change < 0: red; Stock Price Change = 0: grey'
          },
          tooltip: {
            formatter: function (info: any) {
              let value = info.value;

              let amount = value[0];
              amount = isValidNumber(amount)
                ? echarts.format.addCommas(amount * 1000)
                : '-';

              let amount2011 = value[1];
              amount2011 = isValidNumber(amount2011)
                ? echarts.format.addCommas(amount2011 * 1000) + '$'
                : '-';

              let change = value[2];
              let Open: any = value[4] ?? 0;
              let High: any = value[5] ?? 0;
              let Low: any = value[6] ?? 0;
              let Close: any = value[7] ?? 0;
              let Volume: any = value[8] ?? 0;
              change = isValidNumber(change) ? change.toFixed(2) + '%' : '-';

              return [
                '<div class="image-container">'+
                // '<img id="loader" src="./assets/loader.gif" alt="Loading...">'+
                '<img id="original-image" src="https://trucharts.in/Chart.aspx?Provider=DB&Code='+info.name+'&Type=3&Scale=0&IND=&OVER=&Skin=Black&Size=500*250&RT=1&Start='+sixMonthsBackYYYYMMDD+'&End='+todayYYYYMMDD+'&Layout=2LineBlack;DefaultBlack&Cycle=Day1&HIS=0" alt="Original Image"></div>'+
                // '<img src="https://trucharts.in/Chart.aspx?Provider=DB&Code='+info.name+'&Type=3&Scale=0&IND=&OVER=&Skin=Black&Size=500*250&RT=1&Start='+sixMonthsBackYYYYMMDD+'&End='+todayYYYYMMDD+'&Layout=2LineBlack;DefaultBlack&Cycle=Day1&HIS=0"/>'+
                '<div class="tooltip-title"><strong>' +
                echarts.format.encodeHTML(info.name) +
                '</strong></div>',
                '<b>MarketCap:</b> ' + amount + '<br>',
                // '2022-12-02: &nbsp;&nbsp;' + amount2011 + '<br>',
                ' <b>Open:</b>' + Open,
                ' <b>High:</b>' + High,
                ' <b>Low:</b>' + Low,
                ' <b>Close:</b>' + Close,
                ' <b>Volume:</b>' + Volume,
                '<br> <b>Price Change(%):</b>' + change
              ].join('');
            }
          },
          series: [
            {
              name: 'ALL',
              top: 80,
              type: 'treemap',
              label: {
                show: true,
                formatter: '{b}'
              },
              itemStyle: {
                borderColor: 'black'
              },
              visualMin: visualMin,
              visualMax: visualMax,
              visualDimension: 3,
              levels: [
                {
                  itemStyle: {
                    borderWidth: 3,
                    borderColor: '#333',
                    gapWidth: 3
                  }
                },
                {
                  color: ['#942e38', '#aaa', '#269f3c'],
                  colorMappingBy: 'value',
                  itemStyle: {
                    gapWidth: 1
                  }
                }
              ],
              data: result
            }
          ]
        })
      );
    });

    option && myChart.setOption(option);
  }

  setReportType(repType: string) {
    this.repType = repType;
    this.bindReport();
  }
  
}
// TypeScript logic
window.addEventListener('load', () => {
  const loader = document.getElementById('loader') as HTMLImageElement;
  const originalImage = document.getElementById('original-image') as HTMLImageElement;

  if (originalImage) {
      originalImage.onload = () => {
          if (loader) {
              loader.style.display = 'none';
          }
          originalImage.style.display = 'block';
      };

      originalImage.onerror = () => {
          if (loader) {
              loader.src = './assets/error.png'; // Set a fallback image in case of error
          }
      };
  }
});