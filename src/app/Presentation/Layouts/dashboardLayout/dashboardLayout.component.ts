import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarMenuItemComponent } from '../../Components/sidebar-menu-item/sidebar-menu-item.component';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarMenuItemComponent],
  templateUrl: './dashboardLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  // obtiene las rutas declaradas en el app.routes
  public routes = routes[0].children?.filter((route) => route.data) ?? [];

  constructor() {
    //console.log(this.routes);
  }
}
