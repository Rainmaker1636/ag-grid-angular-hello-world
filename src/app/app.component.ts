import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import {
  CellClickedEvent,
  CellDoubleClickedEvent,
  GridOptions,
  ICellRendererParams
} from "ag-grid-community";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public selectedRow;
  public editingIndex: number | null = null;
  initData = { id: null, make: null, price: null };
  public editingMode: boolean = false;
  rowData = [
    { id: null, make: null, price: null },
    { id: 1, make: "Toyota", price: 35000 },
    { id: 2, make: "Ford", price: 32000 },
    { id: 3, make: "Porsche", price: 72000 }
  ];
  columnDefs = [
    { field: "id", editable: false, sortable: true },
    {
      field: "make",
      editable: (param: ICellRendererParams) => {
        return this.editingIndex == param.data.id && this.editingMode;
      },
      sortable: true
    },
    {
      field: "price",
      editable: (param: ICellRendererParams) => {
        return this.editingIndex == param.data.id && this.editingMode;
      },
      sortable: "true;"
    },
    {
      field: "action",
      cellRenderer: (param: ICellRendererParams) => {
        const addBtnDiv: HTMLElement = document.createElement("div");
        const addBtn: HTMLElement = document.createElement("button");
        const doubleBtnDiv: HTMLElement = document.createElement("div");
        const editBtn: HTMLElement = document.createElement("button");
        const deleteBtn: HTMLElement = document.createElement("button");
        const saveAdd: HTMLElement = document.createElement("button");
        const cancleAdd: HTMLElement = document.createElement("button");
        const saveEdit: HTMLElement = document.createElement("button");
        const cancleEdit: HTMLElement = document.createElement("button");
        const saveDelete: HTMLElement = document.createElement("button");
        const cancleDelete: HTMLElement = document.createElement("button");

        addBtn.innerHTML = `Add`;
        editBtn.innerHTML = "Edit";
        deleteBtn.innerHTML = "Delete";

        saveAdd.innerHTML = `Save`;
        cancleAdd.innerHTML = "Cancel";

        saveEdit.innerHTML = `Update`;
        cancleEdit.innerHTML = "CancelUpdate";

        saveDelete.innerHTML = `Confirm`;
        cancleDelete.innerHTML = "CancelDelete";

        addBtnDiv.appendChild(addBtn);
        doubleBtnDiv.appendChild(editBtn);
        doubleBtnDiv.appendChild(deleteBtn);

        addBtn.onclick = async () => {
          if (this.editingMode == false) {
            this.editingMode = true;
            this.editingIndex = param.data.id;
            addBtnDiv.replaceChild(saveAdd, addBtn);
            addBtnDiv.appendChild(cancleAdd);
          }
        };
        editBtn.onclick = async () => {
          alert(this.editingMode + " " + this.editingIndex);
          if (this.editingMode == false) {
            this.editingMode = true;
            this.editingIndex = param.data.id;
            this.initData.id = param.data.id;
            this.initData.make = param.data.make;
            this.initData.price = param.data.price;
            doubleBtnDiv.replaceChild(saveEdit, editBtn);
            doubleBtnDiv.replaceChild(cancleEdit, deleteBtn);
          }
        };
        deleteBtn.onclick = async () => {
          if (this.editingMode == false) {
            this.editingIndex = param.data.id;
            doubleBtnDiv.replaceChild(saveDelete, editBtn);
            doubleBtnDiv.replaceChild(cancleDelete, deleteBtn);
          }
        };
        saveAdd.onclick = async () => {
          this.editingMode = false;
          param.api.redrawRows(); //弄上去
          addBtnDiv.replaceChild(addBtn, saveAdd);
          addBtnDiv.removeChild(cancleAdd);
        };
        cancleAdd.onclick = async () => {
          this.editingMode = false;
          param.data.id = null;
          param.data.mark = null;
          param.data.price = null;
          param.api.redrawRows();
          addBtnDiv.replaceChild(addBtn, cancleAdd);
          addBtnDiv.removeChild(saveAdd);
        };
        saveEdit.onclick = async () => {
          this.editingMode = false;
          param.api.redrawRows();
          doubleBtnDiv.replaceChild(editBtn, saveEdit);
          doubleBtnDiv.replaceChild(deleteBtn, cancleEdit);
        };
        cancleEdit.onclick = async () => {
          this.editingMode = false;
          param.data.make = this.initData.make;
          param.data.price = this.initData.price;
          param.api.redrawRows();
          doubleBtnDiv.replaceChild(editBtn, saveEdit);
          doubleBtnDiv.replaceChild(deleteBtn, cancleEdit);
        };
        saveDelete.onclick = async () => {
          this.editingMode = false;
          param.api.redrawRows();
          doubleBtnDiv.replaceChild(editBtn, saveDelete);
          doubleBtnDiv.replaceChild(deleteBtn, cancleDelete);
        };
        cancleDelete.onclick = async () => {
          this.editingMode = false;
          param.api.redrawRows();
          doubleBtnDiv.replaceChild(editBtn, saveDelete);
          doubleBtnDiv.replaceChild(deleteBtn, cancleDelete);
        };
        if (param.data.id == null) {
          return addBtnDiv;
        }
        return doubleBtnDiv;
      }
    }
  ];

  rowSelection: "single";
  editType: "fullRow";

  onSelectionChanged($event) {
    alert("haha");
  }

  clearBtn(param: ICellRendererParams) {
    const addBtnDiv: HTMLElement = document.createElement("div");
    const addBtn: HTMLElement = document.createElement("button");
    const doubleBtnDiv: HTMLElement = document.createElement("div");
    const editBtn: HTMLElement = document.createElement("button");
    const deleteBtn: HTMLElement = document.createElement("button");

    addBtn.innerHTML = `Add`;
    editBtn.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";
    if (param.data.id == null) {
      return addBtnDiv;
    }
    return doubleBtnDiv;
  }

  onCellClicked($event) {
    alert("haha");
    // check whether the current row is already opened in edit or not
    if (this.editingIndex != $event.rowIndex) {
      alert("haha");
      $event.api.startEditingCell({
        rowIndex: $event.rowIndex,
        colKey: $event.column.colId
      });
      this.editingIndex = $event.rowIndex;
    }
  }
}
