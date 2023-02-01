import React, {Component} from "react";
import {AgGridReact, AgGridColumn} from "ag-grid-react";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowData: [
                {make: "Toyota", model: "Celica", price: 35000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000}
            ]
        }
        
        this.onGridReady = this.onGridReady.bind(this)
        this.handleEditing = this.handleEditing.bind(this);
        this.handleCellDoubleClicked = this.handleCellDoubleClicked.bind(this);
        // Only allow to edit cells, if this flag is true
        this.clickToEdit = false;
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
        
        this.gridApi.addEventListener('cellEditingStarted', this.clearClickToEditMode);
    }
    
    componentWillUnmount() {
        this.gridApi.removeEventListener('cellEditingStarted', this.clearClickToEditMode);
    }
    
    clearClickToEditMode() {
        this.clickToEdit = false;
    }
    
    handleEditing() {
        return this.clickToEdit;
    }
    
    handleCellDoubleClicked(evt) {
        const { column: { colId }, node: { rowIndex }} = evt;

        this.clickToEdit = true;
        this.gridApi.startEditingCell({
          rowIndex,
          colKey: colId
        });     
    }

    render() {
        let containerStyle = {
            height: 115
        };

        return (

            <div>
                <div style={containerStyle} className="ag-theme-fresh">
                    <AgGridReact
                        // properties
                        rowData={this.state.rowData}
                        singleClickEdit={false}
                        
                        // events
                        onGridReady={this.onGridReady}
                        onCellDoubleClicked={this.handleCellDoubleClicked}>
                        
                        {/*column definitions */}
                        <AgGridColumn field="make" editable={this.handleEditing}></AgGridColumn>
                        <AgGridColumn field="model" editable={this.handleEditing}></AgGridColumn>
                        <AgGridColumn field="price"></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        )
    }
};
