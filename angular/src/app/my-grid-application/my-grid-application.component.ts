import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebWorkerService } from '../services/web-worker.service';


@Component({
  selector: 'app-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit, OnDestroy {
  gridOptions = <GridOptions>{};
  gridApi = <GridApi>{};
  private serverUrl = 'http://localhost:8080/ag-grid-websocket';
  private stompClient: any;
  private socketData: any[] = [];
  rowCount: any = 0;
  private tryAttempt: any = 0;
  private webWorker: WebWorkerService;

  constructor(private webWorkerService: WebWorkerService) {
    this.webWorker = webWorkerService;
    this.gridOptions = <GridOptions>{};
    this.gridApi = <GridApi>{};
    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Value A', field: 'valueA' },
      { headerName: 'Value B', field: 'valueB' },
      { headerName: 'Value C', field: 'valueC' },
      { headerName: 'Value D', field: 'valueD' },
      { headerName: 'Value E', field: 'valueE' },
      { headerName: 'Value F', field: 'valueF' },
      { headerName: 'Value G', field: 'valueG' },
      { headerName: 'Value H', field: 'valueH' },
      { headerName: 'Value I', field: 'valueI' },
      { headerName: 'Value J', field: 'valueJ' }
    ];
    this.gridOptions.rowData = [];
    this.gridOptions.deltaRowDataMode = true;
    this.gridOptions.enableCellChangeFlash = true;
    //this.gridOptions.enableFilter = true;
    this.gridOptions.cacheQuickFilter = true;
    // this.gridOptions.floatingFilter = true;
    this.gridOptions.getRowNodeId = function(data) {
      return data.id;
    };
  }

  ngOnInit() {
    this.initializeWebSocketConnection();
    this.webWorker.messageWorker.addEventListener('message', (e) => {
      console.log('Received from worker:' + e.data);
      if (e.data === 'Connect-Now') {
        this.initializeWebSocketConnection();
      }
    }, false);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  updateGrid() {
    const item = this.socketData.splice(0);
    console.log(this.gridApi);
    if (this.gridApi.getRowNode(item[0].id) === undefined) {
      console.log('adding');
      this.gridApi.updateRowData({ add: item });
    } else {
      console.log('updating');
      this.gridApi.updateRowData({ update: item });
    }
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame: any) => {
      that.stompClient.subscribe('/grid-data', (message: any) => {
        if (message.body) {
          that.socketData.push(JSON.parse(message.body));
          that.updateGrid();
        }
      });
    }, (error: any) => {
      that.retryConnection();
    });
  }

  retryConnection() {
    this.tryAttempt += 1;
    const message = ['Should-Reconnect-Websocket', this.tryAttempt];
    this.webWorkerService.postMessage(message);
  }

  ngOnDestroy() {
    this.disconnectWebSocketConnection();
  }

  disconnectWebSocketConnection() {
    if (this.stompClient !== undefined) {
      this.stompClient.disconnect();
    }
  }
}
