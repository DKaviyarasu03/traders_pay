import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allData: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';

  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  currentPage = 1;
  pageSize = 10;

  wallets = [
  // { name: 'Purchase Wallet', amount: 2500.50, color: 'text-success' },
  { name: 'Income Wallet', amount: 1800.75, color: 'text-primary' },
  // { name: 'Withdrawal Wallet', amount: 900.25, color: 'text-danger' }
];
  funds = [
  // { name: 'Purchase Wallet', amount: 2500.50, color: 'text-success' },
  { name: 'Add Funds', amount: 1800.75, color: 'text-primary' },
  { name: 'Withdraw', amount: 1800.75, color: 'text-primary' },
  // { name: 'Withdrawal Wallet', amount: 900.25, color: 'text-danger' }
];

  selectedShop: any = null;

  constructor(
    private registerService: LandingService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private loader:LoaderService
  ) {}

  paginatedData: any[] = [];


  // Open Modal with Shop Data
  openShopModal(shop: any) {
    
    this.selectedShop = shop;
    const modalElement: any = document.getElementById('shopModal');
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }

  // Pay Function
  payShop(shop: any) {
    this.toastr.info(` pay currently not active  ${shop.shop_name}`);
  }
  location(shop: any) {
    this.toastr.info(`  currently inactive`);
  }

  ngOnInit(): void {
    this.loader.start()
    this.registerService.shops().subscribe((data: any) => {
      if (data) {
        this.allData = data;
        this.filteredData = [...this.allData];
        this.updatePagination();
        this.loader.stop()
      }
    });
  }

  filterData() {
    const search = this.searchText.toLowerCase();
    this.filteredData = this.allData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(search)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);
    this.paginatedData = this.filteredData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  logout() {
    this.toastr.success('Logged out');
    this.router.navigate(['/']);
  }
}
