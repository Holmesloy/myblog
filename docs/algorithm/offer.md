---
sidebarDepth: 2
---

# 剑指offer

## 在线OJ输入输出
1. Java  
   `nextInt()`：输入整数  
   `nextLine()`：输入字符串，换行表示结束  
   `nextDouble()`：输入双精度数  
   `next()`：输入字符串（以空格作为分隔符，换行也可）  
   输入语句：`Scanner s = new Scanner(System.in);`  
   例子：连接用户输入的相邻两个字符串并输出
   ```java
   import java.util.Scanner;

   public class Main{
       public static void main(String[] args){
           Scanner sc = new Scanner(System.in);
           while(sc.hasNext()){    // 判断是否有下一个输入
               String a = sc.next();  // 读取一个字符串
               String b = sc.next();

               System.out.println(a + b);
           }
       }
   }
   ```
   运行结果：  
   ```
   hello world ni hao
   helloworld
   nihao
   ```
2. Javascript  
   牛客网使用`readline()`函数进行输入，将数据处理后再赋值
   ```javascript
   while(line = readline()){   // 判断是否还有下一个输入
       var lines = line.split('')  // 将字符串分割为单个字符组成的数组
       var a = parseInt(lines[0])  // a为数组第一个值
       var b = parseInt(lines[1])
       print(a + b)
   }
   ```
## 剑指offer题目
1. 数组中重复的数字  
   描述：在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。  

   