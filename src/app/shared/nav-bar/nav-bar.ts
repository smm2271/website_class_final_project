import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { UserService } from '../../services/user.service';

@Component({
    selector: 'nav-bar',
    standalone: true,
    imports: [RouterLink, RouterModule],
    templateUrl: './nav-bar.html',
    styleUrl: './nav-bar.scss',
})

export class NavBar {
    protected userService = inject(UserService);

    // 使用 signal 來追蹤登出按鈕的顯示狀態
    showLogoutButton = signal(false);

    changeShowLogoutButtonStatus() {
        // 切換顯示狀態
        this.showLogoutButton.set(!this.showLogoutButton());
        console.log('登出按鈕狀態:', this.showLogoutButton());
    }

    logout() {
        console.log('執行登出');
        this.userService.logoutApi().subscribe({
            next: () => {
                console.log('登出成功');
                this.showLogoutButton.set(false);
            },
            error: (error) => {
                console.error('登出失敗:', error);
            }
        });
    }
}
