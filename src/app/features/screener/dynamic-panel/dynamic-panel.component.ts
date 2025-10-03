import {Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DynamicData } from '../data/dynamic.data';
import { Dynamic } from '../../../core/models/dynamic.model';

@Component({
    selector: 'app-dynamic-panel',
    templateUrl: './dynamic-panel.component.html',
    styleUrls: ['./dynamic-panel.component.css']
})
export class DynamicPanelComponent implements OnInit {
    @Input() dynamic: Dynamic[];
    selectedDynamic: Dynamic = new Dynamic({});
    @Output() handleData: EventEmitter<any> = new EventEmitter<any>();
    @Output() handleUnSelectDynamicRefItem: EventEmitter<any> = new EventEmitter<any>();
    dynamicRefs = DynamicData.data;
    old: any;
    errors: any[] = [];
    isShowModal: boolean;

    constructor(private router: Router,
                private changeDetector: ChangeDetectorRef) {
    }
    ngOnInit() {
        this.changeDetector.detectChanges();
        this.isShowModal = false;
    }

    selectItem(selectedIndex: number) {
        this.getSelectedDynamicItem(selectedIndex);
        this.isShowModal = true;
    }

    isBelongsToDynamic(ref: any) {
        return this.dynamic.findIndex(item => ref.name === item.name);
    }

    getSelectedDynamicItem(index: number) {
        const belongIndex = this.isBelongsToDynamic(this.dynamicRefs[index]);
        if (belongIndex === -1) {
            this.selectedDynamic = this.dynamicRefs[index];
            const errorTemp = [];
            this.selectedDynamic.values.forEach(() => {
                errorTemp.push(false);
            });
            this.errors = errorTemp;
        } else {
            this.errors = [];
            this.selectedDynamic = this.dynamic[belongIndex];
        }
    }

    onChangeValue(val: any, valueIndex) {
        const min = this.selectedDynamic.values[valueIndex].min;
        const max = this.selectedDynamic.values[valueIndex].max;
        this.errors[valueIndex] = (val < min || val > max);
    }

    saveDynamicItem() {
        const dynamicIndex = this.dynamic.findIndex(p => p.title === this.selectedDynamic.title);
        if (dynamicIndex === -1) {
            this.dynamic.push(this.selectedDynamic);
        } else {
            this.dynamic.splice(dynamicIndex, 1, this.selectedDynamic);
        }

        let strVal = '';
        const realVal = this.selectedDynamic.values;
        realVal.forEach(val => {
            const index = realVal.findIndex(item => item.name === val.name);
            if (index === realVal.length - 1) {
                strVal += val.name + '=' + val.value;
            } else {
                strVal += val.name + '=' + val.value + ',';
            }
        });

        const filterData = {index: 'dynamic', id: this.selectedDynamic.title, value: strVal};
        this.selectedDynamic = new Dynamic({});
        const data = {
            filter: filterData,
            dynamic: this.dynamic,
            selectedDynamic: this.selectedDynamic
        };
        this.isShowModal = false;
        this.handleData.emit(data);
    }

    removeDynamicItem() {
        this.isShowModal = false;
        const data = {
            unSelectedDynamic: this.selectedDynamic
        };
        this.handleUnSelectDynamicRefItem.emit(data);
    }

    isValidButton() {
        if (!this.errors || this.errors.length === 0) {
            return true;
        } else {
            const index = this.errors.findIndex((item) => item === true);
            return index === -1;
        }
    }
}
