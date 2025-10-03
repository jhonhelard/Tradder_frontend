export const DynamicData = {
    data: [
        {
            title: 'CLOSE is greate then OPEN',
            name: 'CLOSE > OPEN',
            values: [],
            help: 'The stock is going up'
        },
        {
            title: 'Stocks Between Price Range',
            name: 'Between Range',
            values: [
                { name: 'N1', min: 0.01, max: 1000, value: 10, help: 'N1 Parameter range is from 0.01 to 1000' },
                { name: 'N2', min: 0.01, max: 1000, value: 12, help: 'N2 Parameter range is from 0.01 to 1000' },
                { name: 'N3', min: 0.01, max: 5000000000000, value: 100000, help: 'N3 Parameter range is from 0.01 to 5000000000000' }
            ],
            help: 'Scan the quotes between N1 and N2'
        },
        {
            title: 'Moving Average Cross',
            name: 'Cross MA',
            values: [
                { name: 'N1', min: 1, max: 10000000, value: 20, help: 'MA(N1) cross MA(N2) from below within N3 days' },
                { name: 'N2', min: 1, max: 10000000, value: 50, help: 'MA(N1) cross MA(N2) from below within N3 days' },
                { name: 'N3', min: 1, max: 100, value: 1, help: 'MA(N1) cross MA(N2) from below within N3 days' },
                { name: 'X1', min: 0, max: 10000, value: 1, help: 'Minimum Price (Price range of stock between X1 and X2)' },
                { name: 'X2', min: 0, max: 10000, value: 1000, help: 'Maximum Price (Price range of stock between X1 and X2)' },
                { name: 'X3', min: 0, max: 1000, value: 15, help: 'Stock Volume is greater than X3 Days Average Volume' }
            ],
            help: 'MA(N1) cross MA(N2) from below within N3 days\n' +
                'And Price range of stock between X1 and X2\n' +
                'And Stock Volume is greater than X3 Days Average Volume '
        },
        {
            title: 'New High in N days ',
            name: 'Newest high within N days',
            values: [
                { name: 'N', min: 1, max: 5000, value: 3, help: 'N Parameter range is from 1 to 50000' }
            ],
            help: 'Newest high today since last N days'
        },
        {
            title: 'New Low in N days',
            name: 'Newest low within N days',
            values: [
                { name: 'N', min: 1, max: 5000, value: 3, help: 'N Parameter range is from 1 to 50000' }
            ],
            help: 'Newest low today since last N days'
        },
        {
            title: 'Bollinger Band scanning',
            name: 'Bollinger Band scanning',
            values: [
                { name: 'N1', min: 5, max: 100, value: 26, help: 'N1 Parameter range is from 5 to 100' },
                { name: 'P', min: 0.2, max: 10, value: 2, help: 'P Parameter range is from 0.1 to 10' }
            ],
            help: 'Bollinger Band scanning'
        },
        {
            title: 'SAR scan',
            name: 'SAR scan',
            values: [
                { name: 'N1', min: 1, max: 50, value: 10, help: 'N1 Parameter range is from 1 to 50' },
                { name: 'STEP', min: 1, max: 5, value: 2, help: 'STEP Parameter range is from 1 to 5' },
                { name: 'MAXP', min: 5, max: 80, value: 20, help: 'MAXP Parameter range is from 5 to 80' },
            ],
            help: 'SAR scan'
        },
        {
            title: 'Strong Volume Gainers',
            name: 'Strong Volume Gainers',
            values: [
                { name: 'N1', min: 1, max: 100, value: 4, help: 'N1 Parameter range is from 1 to 100' },
                { name: 'N2', min: 1, max: 100, value: 20, help: 'N2 Parameter range is from 1 to 100' }
            ],
            help: 'Strong Volume Gainers\n' +
                'Formula used: V>(MA(V,N2)*N1) & ISUP'
        },
        {
            title: 'Strong Volume Decliners',
            name: 'Strong Volume Decliners',
            values: [
                { name: 'N1', min: 1, max: 100, value: 4, help: 'N1 Parameter range is from 1 to 100' },
                { name: 'N2', min: 1, max: 100, value: 20, help: 'N2 Parameter range is from 1 to 100' }
            ],
            help: 'Strong Volume Decliners\n' +
                'Formula used: V>(MA(V,N2)*N1) & ISDOWN'
        },
        {
            title: 'Bullish MA Crossover',
            name: 'Bullish MA Crossover',
            values: [
                { name: 'N1', min: 1, max: 100, value: 13, help: 'N1 Parameter range is from 1 to 100' },
                { name: 'N2', min: 1, max: 100, value: 50, help: 'N2 Parameter range is from 1 to 100' }
            ],
            help: 'Stocks that had the simple moving average of the last N1 closing prices move above the simple moving average of the last N2 closing prices.\n' +
                'Formula used: Cross(MA(C,N1),MA(C,N2)) & ISUP  & V>0'
        },
        {
            title: 'Bearish MA Crossover',
            name: 'Bearish MA Crossover',
            values: [
                { name: 'N1', min: 1, max: 100, value: 13, help: 'N1 Parameter range is from 1 to 100' },
                { name: 'N2', min: 1, max: 100, value: 50, help: 'N2 Parameter range is from 1 to 100' }
            ],
            help: 'Stocks that had the simple moving average of the last N1 closing prices move below the simple moving average of the last N2 closing prices.\n' +
                'Formula used: Cross(MA(C,N1),MA(C,N2)) & ISUP  & V>0'
        },
        {
            title: 'Moved Above Upper Bollinger Band',
            name: 'Moved Above Upper Bollinger Band',
            values: [
                { name: 'N', min: 1, max: 100, value: 20, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks which closed above the upper line of their N-day Bollinger Band and which were below that same band after the previous trading session.'
        },
        {
            title: 'Moved Below Lower Bollinger Band',
            name: 'Moved Below Lower Bollinger Band',
            values: [
                { name: 'N', min: 1, max: 100, value: 20, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks which closed below the lower line of their N-day Bollinger Band and which were above that same band after the previous trading session.'
        },
        {
            title: 'Gap Ups',
            name: 'Gap Ups',
            values: [
                { name: 'P', min: 1, max: 100, value: 2.5, help: 'P Parameter range is from 1 to 100' }
            ],
            help: 'Stocks whose current low was at least P percent higher than the previous day\'s high.'
        },
        {
            title: 'Gap Downs',
            name: 'Gap Downs',
            values: [
                { name: 'P', min: 1, max: 100, value: 2.5, help: 'P Parameter range is from 1 to 100' }
            ],
            help: 'Stocks whose current high was at least P percent lower than the previous day\'s low.'
        },
        {
            title: 'Island Tops',
            name: 'Island Tops',
            values: [
                { name: 'P', min: 1, max: 100, value: 2.5, help: 'P Parameter range is from 1 to 100' }
            ],
            help: 'Stocks that gapped up at least P percent yesterday and gapped down at least P percent today.'
        },
        {
            title: 'Stocks in a New Uptrend (ADX)',
            name: 'Island Tops',
            values: [
                { name: 'N', min: 1, max: 100, value: 14, help: 'N Parameter range is from 1 to 100' },
                { name: 'M', min: 1, max: 100, value: 20, help: 'M Parameter range is from 1 to 100' }
            ],
            help: 'Stocks for which the N-day ADX Line just moved above the +M level (signaling a new trend) and the +DI line is above the -DI line (signaling that the new trend is upwards).'
        },
        {
            title: 'Stocks in a New Downtrend (ADX)',
            name: 'Stocks in a New Downtrend (ADX)',
            values: [
                { name: 'N', min: 1, max: 100, value: 14, help: 'N Parameter range is from 1 to 100' },
                { name: 'M', min: 1, max: 100, value: 20, help: 'M Parameter range is from 1 to 100' }
            ],
            help: 'Stocks for which the N-day ADX Line just moved above the +M level (signaling a new trend) and the -DI line is above the +DI line (signaling that the new trend is downwards).'
        },
        {
            title: 'Bullish MACD Crossovers',
            name: 'Bullish MACD Crossovers',
            values: [
                { name: 'Long', min: 1, max: 100, value: 26, help: 'Long Parameter range is from 1 to 100' },
                { name: 'Short', min: 1, max: 100, value: 12, help: 'Short Parameter range is from 1 to 100' },
                { name: 'M', min: 1, max: 100, value: 9, help: 'M Parameter range is from 1 to 100' }
            ],
            help: 'Stocks whose MACD line crossed above the signal line today after being below the signal line for the previous three days. The MACD parameters used are 26 ( Long), 12 (Short) and the signal line is a 9-day (M-day) EMA of the MACD line.'
        },
        {
            title: 'Bearish MACD Crossovers',
            name: 'Bearish MACD Crossovers',
            values: [
                { name: 'Long', min: 1, max: 100, value: 26, help: 'Long Parameter range is from 1 to 100' },
                { name: 'Short', min: 1, max: 100, value: 12, help: 'Short Parameter range is from 1 to 100' },
                { name: 'M', min: 1, max: 100, value: 9, help: 'M Parameter range is from 1 to 100' }
            ],
            help: 'Stocks whose MACD line crossed below the signal line today after being above the signal line for the previous three days. The MACD parameters used are 26 ( Long), 12 (Short) and the signal line is a 9-day (M-day) of the MACD line.'
        },
        {
            title: 'Overbought with a Declining RSI',
            name: 'Overbought with a Declining RSI',
            values: [
                { name: 'N', min: 1, max: 100, value: 14, help: 'N Parameter range is from 1 to 100' },
                { name: 'L', min: 1, max: 100, value: 70, help: 'L Parameter range is from 1 to 100' }
            ],
            help: 'Stocks whose RSI line moved below LL (70) today after being above LL (70) for the previous three days. The RSI period used is N1 (14).'
        },
        {
            title: 'Oversold with an Improving RSI',
            name: 'Oversold with an Improving RSI',
            values: [
                { name: 'N', min: 1, max: 100, value: 14, help: 'N Parameter range is from 1 to 100' },
                { name: 'L', min: 1, max: 100, value: 30, help: 'L Parameter range is from 1 to 100' }
            ],
            help: 'Stocks whose RSI line moved above LL (30) today after being below LL (30) for the previous three days. The RSI period used is N1 (14).'
        },
        {
            title: 'Improving Chaikin Money Flow',
            name: 'Improving Chaikin Money Flow',
            values: [
                { name: 'N', min: 1, max: 100, value: 21, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks for which the N-day (21-day) Chaikin Money Flow oscillator has just moved above the +20% level.'
        },
        {
            title: 'Declining Chaikin Money Flow',
            name: 'Declining Chaikin Money Flow',
            values: [
                { name: 'N', min: 1, max: 100, value: 21, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks for which the N-day (21-day) Chaikin Money Flow oscillator has just moved below the -20% level.'
        },
        {
            title: 'CCI Buy Signals',
            name: 'CCI Buy Signals',
            values: [
                { name: 'N', min: 1, max: 100, value: 20, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks for which the N-day (20-day) Commodity Channel Index (CCI) has just moved above the +100 level.'
        },
        {
            title: 'CCI Sell Signals',
            name: 'CCI Sell Signals',
            values: [
                { name: 'N', min: 1, max: 100, value: 20, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks for which the N-day (20-day) Commodity Channel Index (CCI) has just moved below the -100 level.'
        },
        {
            title: 'Parabolic SAR Buy Signals',
            name: 'Parabolic SAR Buy Signals',
            values: [
                { name: 'N', min: 1, max: 100, value: 10, help: 'N Parameter range is from 1 to 100' },
                { name: 'STEP', min: 0, max: 100, value: 2, help: 'STEP Parameter range is from 0 to 100' },
                { name: 'MAXP', min: 0, max: 100, value: 20, help: 'MAXP Parameter range is from 0 to 100' }
            ],
            help: 'Stocks whose Parabolic SAR just "flipped" from above the price bars to below the price bars. The parameters used are STEP (2) and MAXP (20).'
        },
        {
            title: 'Parabolic SAR Sell Signals',
            name: 'Parabolic SAR Sell Signals',
            values: [
                { name: 'N', min: 1, max: 100, value: 10, help: 'N Parameter range is from 1 to 100' },
                { name: 'STEP', min: 1, max: 100, value: 2, help: 'STEP Parameter range is from 1 to 100' },
                { name: 'MAXP', min: 1, max: 100, value: 20, help: 'MAXP Parameter range is from 1 to 100' }
            ],
            help: 'Stocks whose Parabolic SAR just "flipped" from below the price bars to ubove the price bars. The parameters used are STEP (2) and MAXP (20).'
        },
        {
            title: 'Fibonnaci',
            name: 'Fibonnaci',
            values: [
                { name: 'N', min: 1, max: 100, value: 40, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Fibonnaci'
        },
        {
            title: 'Down Trend',
            name: 'Down Trend',
            values: [
                { name: 'N', min: 0, max: 1000, value: 10, help: 'N Parameter range is from 0 to 1000' },
                { name: 'P', min: 0, max: 100, value: 90, help: 'P Parameter range is from 0 to 100' },
                { name: 'M', min: 0, max: 1000, value: 52, help: 'M Parameter range is from 0 to 1000' }
            ],
            help: 'DownTrend will show all stocks under N which closed less than P% below their M week high. So for example, if the 52 week high is $10 and the stock closed at $9.00 it would be in the screen.  If it closed at $8.90 it would not show up.'
        },
        {
            title: 'Up at least N% and closed in the upper M% range of the days range',
            name: 'Up at least N% and closed in the upper M% range of the days range',
            values: [
                { name: 'N', min: 0, max: 100, value: 2, help: 'N Parameter range is from 0 to 100' },
                { name: 'M2', min: 0, max: 100, value: 2, help: 'M Parameter range is from 0 to 100' },
                { name: 'P1', min: 0, max: 100000, value: 5, help: 'P1 Parameter range is from 0 to 100000' },
                { name: 'P2', min: 0, max: 10000, value: 10000, help: 'P2 Parameter range is from 0 to 100000' }
            ],
            help: 'up at least N% and closed in the upper M% range of the days range where price close between P1 and P2'
        },
        {
            title: 'Down at least N% and closed in the lower M% range of the days range',
            name: 'Down at least N% and closed in the lower M% range of the days range',
            values: [
                { name: 'N', min: 0, max: 100, value: 2, help: 'N Parameter range is from 0 to 100' },
                { name: 'M', min: 0, max: 100, value: 2, help: 'M Parameter range is from 0 to 100' },
                { name: 'P1', min: 0, max: 100000, value: 5, help: 'P1 Parameter range is from 0 to 100000' },
                { name: 'P2', min: 0, max: 10000, value: 10000, help: 'P2 Parameter range is from 0 to 100000' }
            ],
            help: 'down at least N% and closed in the lower M% range of the days range where price close between P1 and P2.'
        },
        {
            title: 'Muddy Original',
            name: 'Muddy Original',
            values: [
                { name: 'N1', min: 0.001, max: 5000000, value: 1, help: 'N1 Parameter range is from 0.001 to 5000000' },
                { name: 'N2', min: 0.001, max: 5000000, value: 1000, help: 'N2 Parameter range is from 0 to 5000000' },
                { name: 'N3', min: 1, max: 5000000, value: 50, help: 'N3 Parameter range is from 1 to 5000000' },
                { name: 'P2', min: 0, max: 10000, value: 10000, help: 'P2 Parameter range is from 0 to 100000' }
            ],
            help: 'This locates stocks where the price has been decreasing for the past 3 days, has touched the lower Bollinger Band and the volume is above the 90 day average of N3 volume.'
        },
        {
            title: 'Muddy 2',
            name: 'Muddy 2',
            values: [
                { name: 'MinPrice', min: 0, max: 1000000, value: 0.01, help: 'MinPrice Parameter range is from 0 to 1000000' },
                { name: 'MaxPrice', min: 0, max: 1000000, value: 10, help: 'MaxPrice Parameter range is from 0 to 1000000' },
                { name: 'MinVolume', min: 1, max: 10000000000, value: 100000, help: 'MinVolume Parameter range is from 1 to 10000000000' }
            ],
            help: 'This locates stocks where the price has been decreasing for the past 3 days, has touched the lower Bollinger Band and the volume is above the 90 day average of N3 volume.'
        },
        {
            title: 'Avery Zone (Muddy3)',
            name: 'Avery Zone (Muddy3)',
            values: [
                { name: 'MinPrice', min: 0, max: 1000000, value: 0.01, help: 'MinPrice Parameter range is from 0 to 1000000' },
                { name: 'MaxPrice', min: 0, max: 1000000, value: 10, help: 'MaxPrice Parameter range is from 0 to 1000000' },
                { name: 'MinVolume', min: 1, max: 10000000000, value: 100000, help: 'MinVolume Parameter range is from 1 to 10000000000' }
            ],
            help: 'This locates stocks which broke the upper bollinger band and pulled back into a \'zone\' between EMA13 and MA 20.'
        },
        {
            title: 'Muddy Triple (Muddy4)',
            name: 'Muddy Triple (Muddy4)',
            values: [
                { name: 'MinPrice', min: 0, max: 1000000, value: 0.01, help: 'MinPrice Parameter range is from 0 to 1000000' },
                { name: 'MaxPrice', min: 0, max: 1000000, value: 10, help: 'MaxPrice Parameter range is from 0 to 1000000' },
                { name: 'MinVolume', min: 1, max: 10000000000, value: 250000, help: 'MinVolume Parameter range is from 1 to 10000000000' },
                { name: 'N', min: 0, max: 10000, value: 60, help: 'N Parameter range is from 0 to 10000' }
            ],
            help: 'Muddy Triple (Muddy4)'
        },
        {
            title: 'Muddy Double (Muddy5)',
            name: 'Muddy Double (Muddy5)',
            values: [
                { name: 'MinPrice', min: 0, max: 1000000, value: 0.01, help: 'MinPrice Parameter range is from 0 to 1000000' },
                { name: 'MaxPrice', min: 0, max: 1000000, value: 10, help: 'MaxPrice Parameter range is from 0 to 1000000' },
                { name: 'MinVolume', min: 1, max: 10000000000, value: 100000, help: 'MinVolume Parameter range is from 1 to 10000000000' },
                { name: 'N', min: 0, max: 10000, value: 60, help: 'N Parameter range is from 0 to 10000' }
            ],
            help: 'Muddy Double (Muddy5)'
        },
        {
            title: 'NewClosingHigh',
            name: 'NewClosingHigh',
            values: [
                { name: 'N', min: 1, max: 5000, value: 3, help: 'N Parameter range is from 1 to 5000' }
            ],
            help: 'Newest Closing High today since last N days'
        },
        {
            title: 'NewClosingLow',
            name: 'NewClosingHigh',
            values: [
                { name: 'N', min: 1, max: 5000, value: 3, help: 'N Parameter range is from 1 to 5000' }
            ],
            help: 'Newest Closing Low today since last N days'
        },
        {
            title: 'Highest Volume',
            name: 'Highest Volume',
            values: [
                { name: 'N', min: 1, max: 5000, value: 3, help: 'N Parameter range is from 1 to 5000' }
            ],
            help: 'Highest Volume today since last N days'
        },
        {
            title: '6 Weeks High Trigger',
            name: '6 Weeks High Trigger',
            values: [
                { name: 'N', min: 1, max: 500, value: 30, help: 'N Parameter range is from 1 to 500' }
            ],
            help: '6 Weeks High Trigger scan search for Bullish stocks. Parameter N = 30 is used for 30 number of working days for 6 weeks'
        },
        {
            title: '6 Weeks Low Trigger',
            name: '6 Weeks Low Trigger',
            values: [
                { name: 'N', min: 1, max: 500, value: 30, help: 'N Parameter range is from 1 to 500' }
            ],
            help: '6 Weeks Low Trigger scan search for Bearish stocks. Parameter N = 30 is used for 30 number of working days for 6 weeks'
        },
        {
            title: 'Stocks UP by N$',
            name: 'Stocks UP by N$',
            values: [
                { name: 'N', min: 1, max: 100, value: 5, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks UP by N$'
        },
        {
            title: 'Stocks DOWN N$',
            name: 'Stocks DOWN N$',
            values: [
                { name: 'N', min: 1, max: 100, value: 2, help: 'N Parameter range is from 1 to 100' }
            ],
            help: 'Stocks DOWN N$'
        },
        {
            title: 'StochOverbought',
            name: 'StochOverbought',
            values: [
                { name: 'N', min: 1, max: 100, value: 14, help: 'N Parameter range is from 1 to 100' },
                { name: 'M1', min: 1, max: 100, value: 3, help: 'M1 Parameter range is from 1 to 100' },
                { name: 'M2', min: 2, max: 50, value: 3, help: 'M2 Parameter range is from 2 to 50' }
            ],
            help: 'Scan StochOverbought stocks'
        },
        {
            title: 'StochOverSold',
            name: 'StochOverSold',
            values: [
                { name: 'N', min: 1, max: 100, value: 14, help: 'N Parameter range is from 1 to 100' },
                { name: 'M1', min: 1, max: 100, value: 3, help: 'M1 Parameter range is from 1 to 100' },
                { name: 'M2', min: 2, max: 50, value: 3, help: 'M2 Parameter range is from 2 to 50' }
            ],
            help: 'Scan StochOverSold stocks'
        },
        {
            title: 'Stocks above M day SMA',
            name: 'Stocks above M day SMA',
            values: [
                { name: 'M', min: 1, max: 100, value: 50, help: 'M Parameter range is from 1 to 100' }
            ],
            help: 'Stocks closing price above M day SMA'
        },
        {
            title: 'Stocks below M day SMA',
            name: 'Stocks above M day SMA',
            values: [
                { name: 'M', min: 1, max: 100, value: 50, help: 'M Parameter range is from 1 to 100' }
            ],
            help: 'Stocks closing price below M day SMA'
        },
        {
            title: 'Stocks UP 10 Day in a row',
            name: 'Stocks UP 10 Day in a row',
            values: [],
            help: 'Stocks UP 10 Day in a row'
        },
        {
            title: 'Stocks UP 5 Day in a row',
            name: 'Stocks UP 5 Day in a row',
            values: [],
            help: 'Stocks UP 5 Day in a row'
        },
        {
            title: 'Stocks UP 3 Day in a row',
            name: 'Stocks UP 3 Day in a row',
            values: [],
            help: 'Stocks UP 3 Day in a row'
        },
        {
            title: 'Stocks DOWN 3 Day in a row',
            name: 'Stocks DOWN 3 Day in a row',
            values: [],
            help: 'Stocks DOWN 3 Day in a row'
        },
        {
            title: 'Stocks DOWN 5 Day in a row',
            name: 'Stocks DOWN 5 Day in a row',
            values: [],
            help: 'Stocks DOWN 5 Day in a row'
        },
        {
            title: 'Stocks DOWN 10 Day in a row',
            name: 'Stocks DOWN 10 Day in a row',
            values: [],
            help: 'Stocks DOWN 10 Day in a row'
        },
        {
            title: 'RSI Below 30',
            name: 'RSI Below 30',
            values: [
                { name: 'N1', min: 2, max: 100, value: 14, help: 'N1 Parameter range is from 2 to 100' }
            ],
            help: 'RSI Below 30'
        },
        {
            title: 'Weekly Bearish MACD Cross',
            name: 'Weekly Bearish MACD Cross',
            values: [],
            help: 'Stocks with Weekly Bearish MACD Cross'
        },
        {
            title: 'Weekly Bullish MACD Cross',
            name: 'Weekly Bullish MACD Cross',
            values: [],
            help: 'Stocks with Weekly Bullish MACD Cross'
        },
        {
            title: 'Stock Up by $N1 and Volume Up by N2',
            name: 'Stock Up by $N1 and Volume Up by N2',
            values: [
                { name: 'N1', min: 1, max: 1000, value: 5, help: 'N1 Parameter range is from 1 to 1000' },
                { name: 'N2', min: 1, max: 99999999, value: 1000, help: 'N2 Parameter range is from 1 to 99999999' },
            ],
            help: 'Stock Up by $N1 and Volume Up by N2'
        },
        {
            title: 'Stock Down by $N1 and Volume Up by N2',
            name: 'Stock Down by $N1 and Volume Up by N2',
            values: [
                { name: 'N1', min: 1, max: 1000, value: 5, help: 'N1 Parameter range is from 1 to 1000' },
                { name: 'N2', min: 1, max: 99999999, value: 1000, help: 'N2 Parameter range is from 1 to 99999999' },
            ],
            help: 'Stock Down by $N1 and Volume Up by N2'
        },
        {
            title: 'Stock Volume Cross Above 50 Day Avg Volume',
            name: 'Stock Volume Cross Above 50 Day Avg Volume',
            values: [],
            help: 'Stock Volume Cross Above 50 Day Avg Volume'
        },
        {
            title: 'Volume N% Above 50 Day Avg Volume',
            name: 'Volume N% Above 50 Day Avg Volume',
            values: [
                { name: 'N', min: 1, max: 100, value: 15, help: 'N Parameter range is from 1 to 100' },
                ],
            help: 'Volume N% Above 50 Day Avg Volume'
        },
        {
            title: 'Stock hits above MA(N)',
            name: 'Stock hits above MA(N)',
            values: [
                { name: 'N', min: 1, max: 1000, value: 13, help: 'N Parameter range is from 1 to 1000' },
            ],
            help: 'Stock hits above MA(N)'
        },
        {
            title: 'Stock hits below MA(N)',
            name: 'Stock hits below MA(N)',
            values: [
                { name: 'N', min: 1, max: 1000, value: 13, help: 'N Parameter range is from 1 to 1000' },
            ],
            help: 'Stock hits below MA(N)'
        },
        {
            title: 'Low of today touched N day SMA',
            name: 'Low of today touched N day SMA',
            values: [
                { name: 'N', min: 1, max: 1000, value: 30, help: 'N Parameter range is from 1 to 1000' },
            ],
            help: 'Low of today touched N day SMA'
        },
    ]
};