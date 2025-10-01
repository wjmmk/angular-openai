import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sidebar-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-menu-item.component.html',
  styleUrl: './sidebar-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItemComponent {
  @Input({ required: true}) icon!: string;
  @Input({ required: true}) title!: string;
  @Input({ required: true}) description!: string;
  @Input({ required: true}) path!: string;
}
