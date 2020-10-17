## Java字符串和数组
### 字符串String
初始化两种方式：
```java
1. 双引号方式
// 创建引用，a指向存储字符串的地址，若指向字符串不变，则永远只会产生一个地址空间
String a = "hello";  

2. 构造函数方式
// 堆上创建字符串对象，a指向该对象，使用构造函数初始化会指向不同的对象
String a = new String("hello"); 
```
字符串常用方法：
```java
String str = new String("asdfg");

1.length()：字符串长度
int len = str.length();

2.charAt()：返回指定位置字符，索引从0开始
char ch = str.charAt(2); // ch = d

3.substring()：提取字串,左闭右开
String s = str.substring(2, 4) // s = "df"

4.indexOf()：字符查找,返回首次出现位置，可用于字符和子串,没有返回-1
int a = str.indexOf('d');  // a = 2
int b = str.indexOf("sd"); // b = 1

5.replace()：字符串替换，可用于字符和子串
String s1 = str.replace('d', 'm'); // s1 = asmfg
String s2 = str.replace("sd", "mg"); // s2 = amgfg

6.split()：根据匹配的正则表达式拆分字符串为字符数组
String t = "1,2,3,4";
String[] s = t.split(","); // s = [1, 2, 3, 4]

7.trim()：去除字符串两端空格，中间不处理
String test = " a sd ";
String t = test.trim(); // t = "a sd"

8.contains()：判断字符串中是否包含某个字串
str.contains("sd");  // true

9.equals()：String中重写了该方法，用于比较字符值，而==用于比较地址
String a = "java";
String b = "java";
a == b; // false
a.equals(b); // true
```
基本类型转换
```java
1. 字符串转化为基本类型
String s = "3.18";
int a = Integer.parseInt(s);   // a = 3
float b = Float.parseFloat(s); // b = 3.18

2. 基本类型转换成字符串valueOf()
String s1 = String.valueOf(12); // s1 = "12"
String s2 = String.valueOf(3.19); // s2 = "3.19"
```

### StringBuffer可变类
String类不可变，任何对String的改变都会产生新的对象，StringBuffer可变
StringBuffer使用：
```java
1. 初始化空对象
StringBuffer s = new StringBuffer();
2. 分配字节长度
StringBuffer sb1 = new StringBuffer(256); // 分配256字节的字符缓冲区
3. 初始化内容
StringBuffer sb2 = new StringBuffer("hello"); // 字符缓冲区中存入hello

常用方法：
StringBuffer s = new StringBuffer("hello");
1.append()：添加字符或字符串
s.append(" world");  // s = "hello world"

2.deleteCharAt(int index)：删除指定位置字符

3.delete(int index, int index)：删除区间内容，左闭右开

4.insert(int index, c)：在指定位置插入内容
s.insert(0, true);  // s = "truehello"

5.reverse()：内容反转
String reverse = new StringBuffer("hello").reverse().toString(); // reverse = "olleh"

6.setCharAt(int index, char ch)：指定位置字符修改
s.setCharAt(2, 'n');  // s = "henlo"
```

### 数组
Java数组必须初始化后才能使用，初始化后默认值为：  
整型数组：0  
布尔型：false  
引用类型（String、对象等）：null  

初始化三种方式：
```java
1. 静态初始化
int[] intArr = new int[]{1, 2, 3, 4, 5}; // 自己定义初始值，系统根据初始值决定长度

2. 简化版
String[] strArr = {"hi", "ni", "yes"};

3. 动态初始化
String[] arr = new String[8];  // 自己决定长度

注：数组长度不可改变，且不能同时使用静态初始化和动态初始化
```

数组常用方法：
```java
1. 打印一个数组
int[] intArr = {1, 2, 3, 4};
注：直接使用print只会输出数组首个元素地址
三种方式：
(1) 传统for循环
// 注：length为数组的属性，不是方法，length()方法用于字符串
for(int i = 0; i < intArr.length; i++){  
    System.out.println(intArr[i]);
}
(2) foreach方法
for(int a:intArr){
    System.out.println(a);
}
(3) 利用Array类中的toString方法
String a = Arrays.toString(intArr);
System.out.println(a); // [1, 2, 3, 4]
注：结果为包含元素的字符串，在括号中，且用逗号隔开。
```
 
### ArrayList集合类
```java
import java.util.ArrayList;
ArrayList<Integer> arrayList = new ArrayList<>();  // 集合类型声明
arrayList.add(1);  // 添加元素
arrayList.remove(int index); // 按照索引删除元素并返回该值
arrayList.remove(Object o);  // 使用equals方法比较删除第一个相等的元素，返回true或者false
arrayList.remove(Integer.valueOf(2)); // 删除值为2的元素
arrayList.size(); // 集合类的长度使用size()方法
arrayList.contains(c); // 判断集合内是否包含某个值

打印：System.out.println(arrayList);

三种遍历方式：
(1) 迭代器遍历
Iterator<Integer> it = arrayList.iterator();
while(it.hasNext()){
    System.out.println(it.next + " ");
}
(2) for循环索引值遍历
arrayList.get(i)
(3) foreach遍历
for(Integer num:arrayList){
    System.out.println(num + " ");
}

toArray()方法：将集合类转换成数组，两种方式使用
(1) Integer[] inter = arrayList.toArray(new Integer[0]);
(2) Integer[] inter1 = new Integer[arrayList.size()];  // 注意括号
    arrayList.toArray(inter1);

List<Integer>转换为int[]:
int[] intArray = arrayList.stream().mapToInt(Integer::valueOf).toArray();

Arrays.asList()：用于将数组转换成List集合
// 根据数组创建ArrayList
String[] strArray = {"hello", "www"};
ArrayList<String> arrList = new ArrayList<>(Arrays.asList(strArray));
System.out.println(arrList); // [hello, www]，无引号，但是是字符串
```

## JS字符串和数组
### 字符串String
字符串初始化：
```js
var str = ""
var str1 = new String("hi dajiahao")
var len = str1.length;  // len = 11,length为字符串属性
var a = str1[1];  // a = i
```
字符串方法：
```js
var str1 = new String("hi dajiahao")
1.indexOf(c)：字符查找，返回内容出现的首个位置，没有返回-1
var p = str1.indexOf("ia");  // p = -1

2.substring(start, end)：返回截取元素，左闭右开，输入负数为0，从较小处开始
var st = str1.substring(2, -1);  // st = "hi",从0开始了，end可选

3.slice(start, end)：
返回截取元素，左闭右开，可为负数，负数从右开始数,但是end表示的元素要在start之后
var sl = str1.slice(5, -2);  // sl = "jiah",end可选

4.substr(index, n)：从index处返回n个字符
var ss = str1.substr(2,3);  // ss = " da"
注：三者区别在于substring不支持负数，负数从0开始，slice支持负数，而substr会定义返回的字符数

5.replace()：字符串替换，可用于字符和子串

6.split()：用指定的分隔符将String对象分割成字符串数组，用于字符串转换为数组
var str = "hello Jack"
const words = str.split(' ');  // words = ["hello", "jack"]
```

### 数组Array
数组初始化：
```js
var arr = []
var arr1 = new Array("this", "is", "array")
var len = arr1.length; // len = 3,length为数组属性
```
数组基本方法：
```js
1.push(c)：添加元素到数组末尾
var newLen = arr.push("hi");  // arr = ["hi"], newLen = 1, 返回新长度

2.pop()：删除数组末尾元素并返回
var last = arr1.pop();  // last = "array"

3.shift()：删除数组首元素并返回
var first = arr1.shift;  // first = "this"

4.unshift(c)：添加元素到数组头部
var newLen = arr1.unshift("first");  // newLen = 4

5.indexOf()：数组元素查找，返回元素出现的首个位置，没有返回-1
var pos = arr1.indexOf("is"); // pos = 1

6.slice(start, end)：以数组形式返回截取数组元素，左闭右开，可为负数，end可选
var newArr = arr1.slice(1, -1);  // newArr = ["is"]

7.splice(start, n, item1, item2)：
从start处删除n个元素并以数组返回，并添加指定的元素，n可选，item可选，此方法会改变原数组
var deArr = arr1.splice(1, 1, "ok");  // arr1 = ["this", "ok", "array"]
```
数组常用处理方法：
```js
var arr = ["this", "is", "array"]
1.reverse()：反转数组顺序，原数组会被改变
arr.reverse();  // arr = ["array", "is", "this"]

2.sort()：不传参的话元素会被转换成字符串进行比较，返回值为排序后新数组，原数组被改变
var a = [2, 1, 3];
// 升序
a.sort((a, b) => a - b);  // a = [1, 2, 3]
// 降序
a.sort((a, b) => b - a);  // a = [3, 2, 1]

3.join()：将数组元素连接成一个字符串并返回，不改变原数组，用于数组转换为字符串
var b = arr.join('-');  // b = "this-is-array"
var s = "nihao";
var ss = s.split('').reverse().join('');  // ss = "oahin",字符串反转,原数组不变
```
数组的遍历：
```js
var arr = ["hi", "I", "am", "array"];
1.for循环
for(let i = 0; i < arr.length; i++){
    console.log(arr[i])
}

2.forEach(function(value, index, array))：遍历数组，无返回值，不改变原数组
arr.forEach((value, index) => console.log(value, index));

3.map()：有返回数组，不改变原数组，return改变的是对应项，相当于克隆一份，再逐项改变并返回
map(function(value, index, array){
    // do something
    return xx
})
var arr1 = arr.map((value) => value + "o"); // arr1 = ["hio", "Io", "amo", "arrayo"]

4.for...of循环：可用于遍历字符串、数组、Map等等
for(let value of arr){
    console.log(value)
}

5.for...in循环：用于遍历可枚举对象，for of不行
var obj = {a:1, b:2}
for(let prop in obj){  // 不能用of
    console.log(prop + ":" + obj[prop])  // a:1 b:2
}

6.filter()：有返回数组，不改变原数组，数组元素需满足过滤条件
var arr1 = arr.filter((value) => value.includes("a"));  // arr1 = ["am", "array"]

7.reduce()：累加器，数组中每个值依次参与计算，最终返回一个值，不改变原数组
var arr = [2, 3, 4, 1]
var total = arr.reduce((a, b) => a + b);  // total = 10
var b = arr.reduce(function(previousValue, currentValue, index, array){
    return previousValue - currentValue;
});  // b = -6, 参数分别为上一次的值、当前值、索引、原数组

```