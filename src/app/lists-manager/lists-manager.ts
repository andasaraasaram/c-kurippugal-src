import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ListItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TodoList {
  id: string;
  name: string;
  items: ListItem[];
  createdAt: string;
}

@Component({
  selector: 'app-lists-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lists-manager.html',
  styleUrl: './lists-manager.css'
})
export class ListsManagerComponent implements OnInit {
  private readonly STORAGE_KEY = 'lists_manager_app_data_v1';
  
  lists: TodoList[] = [];
  newListName: string = '';
  selectedListId: string | null = null;
  newItemText: string = '';
  editingItemId: string | null = null;
  editingItemText: string = '';

  ngOnInit(): void {
    this.loadData();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private loadData(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.lists = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.lists));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  createList(): void {
    if (this.newListName.trim()) {
      const newList: TodoList = {
        id: this.generateId(),
        name: this.newListName.trim(),
        items: [],
        createdAt: new Date().toISOString()
      };
      this.lists.push(newList);
      this.newListName = '';
      this.saveData();
    }
  }

  deleteList(listId: string): void {
    this.lists = this.lists.filter(list => list.id !== listId);
    if (this.selectedListId === listId) {
      this.selectedListId = null;
    }
    this.saveData();
  }

  selectList(listId: string): void {
    this.selectedListId = listId;
    this.newItemText = '';
    this.editingItemId = null;
  }

  getSelectedList(): TodoList | undefined {
    return this.lists.find(list => list.id === this.selectedListId);
  }

  addItem(): void {
    if (this.newItemText.trim() && this.selectedListId) {
      const newItem: ListItem = {
        id: this.generateId(),
        text: this.newItemText.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      const list = this.getSelectedList();
      if (list) {
        list.items.push(newItem);
        this.newItemText = '';
        this.saveData();
      }
    }
  }

  toggleItemComplete(itemId: string): void {
    const list = this.getSelectedList();
    if (list) {
      const item = list.items.find(i => i.id === itemId);
      if (item) {
        item.completed = !item.completed;
        this.saveData();
      }
    }
  }

  startEditItem(item: ListItem): void {
    this.editingItemId = item.id;
    this.editingItemText = item.text;
  }

  saveEditItem(): void {
    if (this.editingItemText.trim()) {
      const list = this.getSelectedList();
      if (list) {
        const item = list.items.find(i => i.id === this.editingItemId);
        if (item) {
          item.text = this.editingItemText.trim();
          this.editingItemId = null;
          this.editingItemText = '';
          this.saveData();
        }
      }
    }
  }

  cancelEdit(): void {
    this.editingItemId = null;
    this.editingItemText = '';
  }

  deleteItem(itemId: string): void {
    const list = this.getSelectedList();
    if (list) {
      list.items = list.items.filter(item => item.id !== itemId);
      this.saveData();
    }
  }
}