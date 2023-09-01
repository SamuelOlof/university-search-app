import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../university.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  country: string = 'Nigeria';
  filterText: string = '';
  universities: any[] = [];
  loading: boolean = false;

  constructor(private universityService: UniversityService) {}

  ngOnInit(): void {
    this.getUniversitiesByCountry();
  }

  searchUniversities(): void {
    this.getUniversitiesByCountry();
  }

  applyFilter(): void {
    // Re-fetch universities based on the filter text
    this.getUniversitiesByCountry();
  }

  getUniversitiesByCountry(): void {
    this.loading = true;
    this.universityService.getUniversitiesByCountry(this.country)
      .subscribe(data => {
        // Apply filtering if filterText is provided
        if (this.filterText) {
          data = this.filterUniversities(data);
        }
        this.universities = data;
        this.loading = false;
      });
  }

  filterUniversities(data: any[]): any[] {
    // Filter universities based on the filterText
    return data.filter(university =>
      university.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
