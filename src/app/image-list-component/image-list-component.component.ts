import { Component, ElementRef, OnInit , AfterViewInit } from '@angular/core';

import { JsonServiceService } from '../Services/json-service.service';
import { File } from '../Class/File';

@Component({
  selector: 'app-image-list-component',
  templateUrl: './image-list-component.component.html',
  styleUrls: ['./image-list-component.component.css']
})
export class ImageListComponentComponent implements OnInit {
  files: File[] = [];
  filteredFiles: File[] = [];
  filter: { id: string; author: string; text: string } = { id: '', author: '', text: '' };
  private observer!: IntersectionObserver;
  currentPage: number = 1;
  itemsPerPage: number = 10; 
  totalItems!: number;
  i: number = 0;
  displayedItems: File[] = [];

  constructor(private Service: JsonServiceService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.files = this.Service.generateImageDataArray();
    this.totalItems = this.files.length;
    this.filteredFiles = this.paginateItems(this.currentPage);
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLDivElement;
          const indexAttribute = element.getAttribute('data-index');
          const index = indexAttribute ? +indexAttribute : undefined;

          if (index !== undefined) {
            this.loadVisibleImages(index, 1);
          }
        }
      });
    });

    const items = this.elementRef.nativeElement.querySelectorAll('.lazy-image');
    items.forEach((item: Element) => {
      this.observer.observe(item);
    });
  }

  paginateItems(page: number): File[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.files.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.filteredFiles = this.paginateItems(this.currentPage);
  }

  loadVisibleImages(startIndex: number, count: number): void {
    for (let i = startIndex; i < Math.min(startIndex + count, this.files.length); i++) {
      this.filteredFiles.push(this.files[i]);
    }
  }

  trackByFn(index: number, item: File): number {
    return item.id;
  }

  filterFiles(): void {
    this.filteredFiles = this.files.filter((file) => {
      return (
        (this.filter.id === '' || file.id.toString().includes(this.filter.id)) &&
        (this.filter.author === '' || file.author.includes(this.filter.author)) &&
        (this.filter.text === '' || file.text.toString().includes(this.filter.text))
      );
    });
  }

  filterById(id: string): void {
    const idNumber = parseInt(id, 10);
    this.filteredFiles = this.files.filter((file) => file.id === idNumber);
  }

  filterByAuthor(author: string): void {
    this.filteredFiles = this.files.filter((file) => file.author === author);
  }

  async filterByText(text: string): Promise<void> {
    this.filteredFiles = this.files.filter(async (file) => {
      const fileText = await file.text();
      return fileText === text;
    });
  }

  resetFilter(): void {
    this.currentPage = 1; 
    this.filteredFiles = this.paginateItems(this.currentPage);
  }
}
