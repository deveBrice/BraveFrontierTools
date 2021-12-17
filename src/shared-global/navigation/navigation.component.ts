import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
navLinks: any[]
activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Accueil',
        path: '/'
      },
      {
        label: 'Listes des unités',
        path: '/unitsList'
      }
    ]
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(nav => {
        if(nav.path !== undefined && nav.path.charAt(0) === '.') {
          return nav.path;
        }
      }));
    });
  }
}
