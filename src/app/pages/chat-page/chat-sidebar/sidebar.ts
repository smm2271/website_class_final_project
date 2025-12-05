import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    imports: [],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss',
})
export class Sidebar {
    @Output() chatSelected = new EventEmitter<void>();

    // 在你的 HTML 中，當點擊某個聊天室時呼叫此方法
    selectChat() {
        this.chatSelected.emit();
    }
}
