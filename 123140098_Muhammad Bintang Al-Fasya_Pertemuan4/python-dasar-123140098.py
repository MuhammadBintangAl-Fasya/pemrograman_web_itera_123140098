
mahasiswa_list = [
    {"nama": "Agus",  "nim": "12345", "nilai_uts": 89, "nilai_uas": 80, "nilai_tugas": 85},
    {"nama": "Bintang",  "nim": "12346", "nilai_uts": 99, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Tono",  "nim": "12347", "nilai_uts": 77, "nilai_uas": 85, "nilai_tugas": 88},
    {"nama": "Toni",  "nim": "12348", "nilai_uts": 34, "nilai_uas": 55, "nilai_tugas": 50},
    {"nama": "Yanto",   "nim": "12349", "nilai_uts": 52, "nilai_uas": 78, "nilai_tugas": 80}
]

def hitung_nilai_akhir(m):
    """Menghitung nilai akhir berdasarkan bobot"""
    return m["nilai_uts"]*0.3 + m["nilai_uas"]*0.4 + m["nilai_tugas"]*0.3


def tentukan_grade(nilai):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


def tampilkan_tabel(data):
    """Menampilkan data mahasiswa dalam format tabel rapi"""
    print("-" * 70)
    print(f"{'Nama':15} {'NIM':10} {'UTS':5} {'UAS':5} {'Tugas':7} {'Akhir':7} {'Grade'}")
    print("-" * 70)

    for m in data:
        nilai_akhir = hitung_nilai_akhir(m)
        grade = tentukan_grade(nilai_akhir)

        print(f"{m['nama']:15} {m['nim']:10} {m['nilai_uts']:5} {m['nilai_uas']:5} "
              f"{m['nilai_tugas']:7} {nilai_akhir:7.2f} {grade}")

    print("-" * 70)


def tambah_mahasiswa():
    """Input data mahasiswa baru"""
    print("\nINPUT DATA MAHASISWA BARU")
    nama = input("Nama        : ")
    nim = input("NIM         : ")
    uts = float(input("Nilai UTS   : "))
    uas = float(input("Nilai UAS   : "))
    tugas = float(input("Nilai Tugas : "))

    mahasiswa_list.append({
        "nama": nama,
        "nim": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    })

    print("Data berhasil ditambahkan!")


def cari_tertinggi():
    """Mencari mahasiswa dengan nilai akhir tertinggi"""
    return max(mahasiswa_list, key=lambda m: hitung_nilai_akhir(m))


def cari_terendah():
    """Mencari mahasiswa dengan nilai akhir terendah"""
    return min(mahasiswa_list, key=lambda m: hitung_nilai_akhir(m))


def filter_grade(grade):
    """Filter mahasiswa berdasarkan grade"""
    hasil = []
    for m in mahasiswa_list:
        akhir = hitung_nilai_akhir(m)
        if tentukan_grade(akhir) == grade:
            hasil.append(m)
    return hasil


def hitung_rata_rata():
    """Menghitung nilai rata-rata kelas"""
    total = sum(hitung_nilai_akhir(m) for m in mahasiswa_list)
    return total / len(mahasiswa_list)


# ---------------------------------------------------
# PROGRAM UTAMA (MENU)
# ---------------------------------------------------

def menu():
    while True:
        print("""
=========== MENU PENGELOLAAN DATA MAHASISWA ===========
1. Tampilkan semua data
2. Tambah data mahasiswa
3. Cari mahasiswa nilai tertinggi
4. Cari mahasiswa nilai terendah
5. Filter mahasiswa berdasarkan grade
6. Hitung rata-rata nilai kelas
7. Keluar
""")
        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            tampilkan_tabel(mahasiswa_list)

        elif pilihan == "2":
            tambah_mahasiswa()

        elif pilihan == "3":
            m = cari_tertinggi()
            print("\nMahasiswa dengan nilai tertinggi:")
            tampilkan_tabel([m])

        elif pilihan == "4":
            m = cari_terendah()
            print("\nMahasiswa dengan nilai terendah:")
            tampilkan_tabel([m])

        elif pilihan == "5":
            grade = input("Masukkan grade (A/B/C/D/E): ").upper()
            hasil = filter_grade(grade)
            print(f"\nMahasiswa dengan grade {grade}:")
            tampilkan_tabel(hasil)

        elif pilihan == "6":
            rata = hitung_rata_rata()
            print(f"\nRata-rata nilai kelas: {rata:.2f}")

        elif pilihan == "7":
            print("Program selesai. Terima kasih!")
            break

        else:
            print("Pilihan tidak valid!")

# Jalankan menu
menu()
