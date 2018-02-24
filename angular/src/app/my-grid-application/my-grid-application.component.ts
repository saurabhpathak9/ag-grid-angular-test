import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from "ag-grid";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {
  private gridOptions = <GridOptions>{};
  private serverUrl = 'http://localhost:8080/ag-grid-websocket';
  private stompClient;
  private socketData: any[] = [];
  private rowCount: any;
  
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "ID", field: "id" },
      { headerName: "Value A", field: "valueA" },
      { headerName: "Value B", field: "valueB" },
      { headerName: "Value C", field: "valueC" },
      { headerName: "Value D", field: "valueD" },
      { headerName: "Value E", field: "valueE" },
      { headerName: "Value F", field: "valueF" },
      { headerName: "Value G", field: "valueG" },
      { headerName: "Value H", field: "valueH" },
      { headerName: "Value I", field: "valueI" },
      { headerName: "Value J", field: "valueJ" }
    ];
    this.gridOptions.rowData = [];
    this.gridOptions.deltaRowDataMode = true;
    this.gridOptions.enableCellChangeFlash = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.getRowNodeId = function (data) {
      return data.id;
    };
  }
  ngOnInit() {
    this.initializeWebSocketConnection();
  }
  updateGrid() {
    const item = this.socketData.splice(0);
    if (this.gridOptions.api.getRowNode(item[0].id) === undefined) {
      console.log('adding');
      this.gridOptions.api.updateRowData({ add: item })
    }
    else {
      console.log('updating');
      this.gridOptions.api.updateRowData({ update: item });
    }
    this.rowCount = this.gridOptions.api.getDisplayedRowCount();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/grid-data', (message) => {
        if (message.body) {
          that.socketData.push(JSON.parse(message.body));
          that.updateGrid();
        }
      });
    });
  }
}