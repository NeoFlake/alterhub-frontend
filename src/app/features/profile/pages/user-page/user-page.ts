import { Component, signal } from '@angular/core';
import { TAB_VALUES } from '../../../../constants/user-page.constantes';
import { PlayerProfile } from '../../components/player-profile/player-profile';
import { UserProfile } from '../../components/user-profile/user-profile';
import { UserManagement } from '../../components/user-management/user-management';
import { TabButton } from '../../components/tab-button/tab-button';
import { TabPanel } from '../../components/tab-panel/tab-panel';

@Component({ 
  selector: 'user-page',
  imports: [TabButton, TabPanel], 
  templateUrl: './user-page.html'
 }) 
export class UserPage { 

  public tabs = [ 
    {
        id: TAB_VALUES.PLAYER_PROFILE.ID,
        title: TAB_VALUES.PLAYER_PROFILE.TITLE,
        component: PlayerProfile,
        loaded: signal(false),
      },
      {
        id: TAB_VALUES.USER_PROFILE.ID,
        title: TAB_VALUES.USER_PROFILE.TITLE,
        component: UserProfile,
        loaded: signal(false),
      },
      {
        id: TAB_VALUES.PROFILE_MANAGER.ID,
        title: TAB_VALUES.PROFILE_MANAGER.TITLE,
        component: UserManagement,
        loaded: signal(false),
      }
  ]; 

  public tabActive = signal(TAB_VALUES.PLAYER_PROFILE.ID); 

  constructor() {
    // Permet de marquer le premier onglet comme actif à l'initialisation de la page
    this.switchTab(this.tabActive());
  }

  public switchTab(id: string) { 
    this.tabActive.set(id); 
    const tab = this.tabs.find(tab => tab.id === id); 
    if (tab && !tab.loaded()) { 
      tab.loaded.set(true); 
    } 
  } 
}
