import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebchatRoutingModule } from './webchat-routing.module';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { RightpanelComponent } from './rightpanel/rightpanel.component';
import { ChathomeComponent } from './chathome/chathome.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    LeftpanelComponent,
    RightpanelComponent,
    ChathomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    WebchatRoutingModule
  ]
})
export class WebchatModule { }
