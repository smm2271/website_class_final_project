import { Component, signal } from '@angular/core';
import { Sidebar } from './chat-sidebar/sidebar';
import { MessageView } from './message-view/message-view';

@Component({
    selector: 'app-chat-page',
    imports: [Sidebar, MessageView],
    templateUrl: './chat-page.html',
    styleUrl: './chat-page.scss',
})
export class Chat {
    isChatOpen = signal(true);

    onChatSelected() {
        this.isChatOpen.set(true);
    }

    onBackToList() {
        this.isChatOpen.set(false);
    }
}
