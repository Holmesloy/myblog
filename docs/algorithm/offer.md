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
### 1. 数组中重复的数字  
   描述：在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。  

   思路1：使用Set集合结构，将nums中数字依次放入Set集合中，若添加失败，说明该数字重复，直接返回。  
   Java版本：  
   ```java
   class Solution{
       public int findRepeatNumber(int[] nums){
           Set<Integer> set = new HashSet<Integer>();  // HashSet数据结构
           for(int num : nums){   
               if(!set.add(num)){  // set.add方法会返回一个boolean值
                   return num;
               }
           }
           return -1;
       }
   }
   ```
   Javascript版本： 
   ```javascript
    var findRepeatNumber = function(nums) {
       let set = new Set();    // Set数据结构
       for(var num of nums){
           let curLength = set.size;
           set.add(num)
           if(curLength == set.size)  // 添加失败说明数字重复，返回
               return num
       }
        return -1;
    };
   ```
   思路2：由于数组长度为n，数字都在0~n-1范围内，因此若不存在重复数字，则数组进行排序后，大小为i的数字应该正好在数组下标为i的位置。所以我们从头遍历数组，遇到下标为i的数字不等于i时，假设等于n，则用下标n的数字与该数字进行交换，若存在相等数字则返回，否则一直交换到放在正确的位置。
   ```java
   class Solution{
       public int findRepeatNumber(int[] nums){
           for(int i = 0; i < nums.length; i++){
               while(nums[i] != i){
                   if(nums[i] == nums[nums[i]]){
                       return nums[i];
                   }
                   int temp = nums[i];
                   nums[i] = nums[temp];
                   nums[temp] = temp;
               }
           }
           return -1;
       }
   }
   ```

   


   