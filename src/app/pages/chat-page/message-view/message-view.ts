import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-message-view',
    templateUrl: './message-view.html',
    styleUrl: './message-view.scss',
})
export class MessageView {
    @Output() back = new EventEmitter<void>();

    // 在手機版 Header 增加一個「返回」按鈕，點擊時呼叫此方法
    goBack() {
        this.back.emit();
    }
}
