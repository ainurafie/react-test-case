// 1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"
const string = "NEGIE1";

const alphabet = string
	.match(/[a-zA-Z]+/)[0]
	.split("")
	.reverse()
	.join("");

const num = string.match(/[0-9]+/)[0];

const reverse = alphabet + num;

console.log(`1. ${reverse}`);

// 2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu
const sentence = "Saya sangat senang mengerjakan soal algoritma";

const words = sentence.split(" ");

let longest = "";

for (const word of words) {
	if (word.length > longest.length) {
		longest = word;
	}
}

console.log(`2. ${longest}: ${longest.length} character`);

// 3. Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

const result = QUERY.map((val) => INPUT.filter((word) => word === val).length);

console.log(`3. [${result}]`);

// 4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN
const matriks = [
	[1, 2, 0],
	[4, 5, 6],
	[7, 8, 9],
];

let diagonal1 = 0;
let diagonal2 = 0;

for (let i = 0; i < matriks.length; i++) {
	diagonal1 += matriks[i][i];
	diagonal2 += matriks[i][matriks.length - 1 - i];
}

const selisih = diagonal1 - diagonal2;

console.log(`4. ${diagonal1} - ${diagonal2} = ${selisih}`);
