from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title

    @property
    def title(self):
        return self._title

    @abstractmethod
    def display_info(self):
        pass


class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.__author = author

    def display_info(self):
        print(f"[BOOK] ID: {self._item_id} | Judul: {self._title} | Penulis: {self.__author}")


class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.__issue_number = issue_number

    def display_info(self):
        print(f"[MAGAZINE] ID: {self._item_id} | Judul: {self._title} | Edisi: {self.__issue_number}")


class Library:
    def __init__(self):
        self.__items = []

    def add_item(self, item: LibraryItem):
        self.__items.append(item)
        print("Item berhasil ditambahkan!")

    def show_items(self):
        if not self.__items:
            print("Tidak ada item dalam perpustakaan.")
        else:
            print("\n--- DAFTAR ITEM PERPUSTAKAAN ---")
            for item in self.__items:
                item.display_info()

    def find_by_title(self, keyword):
        print(f"\nHasil pencarian judul '{keyword}':")
        found = False
        for item in self.__items:
            if keyword.lower() in item.title.lower():
                item.display_info()
                found = True
        if not found:
            print("Tidak ada item yang cocok.")

    def find_by_id(self, item_id):
        print(f"\nHasil pencarian ID '{item_id}':")
        for item in self.__items:
            if item._item_id == item_id:
                item.display_info()
                return
        print("Item dengan ID tersebut tidak ditemukan.")


if __name__ == "__main__":
    perpustakaan = Library()

    perpustakaan.add_item(Book("0098", "Pemrograman Python", "Andi Wijaya"))
    perpustakaan.add_item(Magazine("0104", "Majalah Teknologi", "Edisi 12"))
    perpustakaan.add_item(Book("0108", "Algoritma & Struktur Data", "Budi Santoso"))

    perpustakaan.show_items()
    perpustakaan.find_by_title("Python")
    perpustakaan.find_by_id("B002")
