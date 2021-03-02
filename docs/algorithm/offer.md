# 剑指offer  

### 1. 数组中重复的数字  
   描述：在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。  
   
   (1) 思路1：使用Set集合结构，将nums中数字依次放入Set集合中，若添加失败，说明该数字重复，直接返回。  
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
   时间复杂度：O(n)，空间复杂度：O(n)  
   (2) 思路2：由于数组长度为n，数字都在0~n-1范围内，因此若不存在重复数字，则数组进行排序后，大小为i的数字应该正好在数组下标为i的位置。所以我们从头遍历数组，遇到下标为i的数字不等于i时，假设等于n，则用下标n的数字与该数字进行交换，若存在相等数字则返回，否则一直交换到放在正确的位置。  
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
   时间复杂度：O(n)，空间复杂度：O(1)  
### 2. 二维数组中的查找  
   描述：在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。  
   (1) 思路：从数组右上角开始比较，如果当前位置大于target则col--，如果当前位置小于target则row++。  
   ```java  
   class Solution {  
      public boolean findNumberIn2DArray(int[][] matrix, int target) {  
        if(matrix == null || matrix.length == 0){  
            return false;  
        }  
        int row = matrix.length;  
        int col = matrix[0].length;  
        int i = 0;  
        int j = col - 1;  
        while(i < row && j >= 0){  
            if(matrix[i][j] > target){  
                j--;  
            }  
            else if(matrix[i][j] < target){  
                i++;  
            }  
            else{  
                return true;  
            }  
        }  
        return false;  
        }  
    }  
   ```  
   时间复杂度：O(m+n)，空间复杂度：O(1)  
### 3. 用两个栈实现队列  
描述：用两个栈实现一个队列。实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。  
(1) 思路：定义两个栈，其中一个栈用于插入，充当队尾，另一个栈用于删除，当作队首。当删除时，若栈2不为空则删除栈顶元素，若栈2为空则将栈1的值push入栈2再删除。注：可以使用LinkedList优化效率。  
java版本：  
```java  
class CQueue {  
    Stack<Integer> stack1;  
    Stack<Integer> stack2;  

    public CQueue() {  
        stack1 = new Stack<>();  
        stack2 = new Stack<>();  
    }  
    
    public void appendTail(int value) {  
        stack1.push(value);  
    }  
    
    public int deleteHead() {  
        if(stack2.isEmpty()){  
            if(stack1.isEmpty()){  
                return -1;  
            }  
            while(!stack1.isEmpty()){  
                stack2.push(stack1.pop());  
            }  
        }  
        return stack2.pop();  
    }  
}  
```  
javascript版本：  
注：需要添加this，数组判空用length。  
```javascript  
var CQueue = function() {  
    this.stack1 = [];  
    this.stack2 = [];  
};  

CQueue.prototype.appendTail = function(value) {  
    this.stack1.push(value);  
};  

CQueue.prototype.deleteHead = function() {  
    if(this.stack2.length){  
        return this.stack2.pop();  
    }  
    while(this.stack1.length){  
        this.stack2.push(this.stack1.pop());  
    }  
    return this.stack2.pop() || -1;  
};  
```  
### 4. Fibonacci数列  
描述：求Fibonacci数列的第n项，定义如下：  
F(0) = 0,   F(1) = 1  
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.  
答案需取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。  
思路：a = a + b; b = a - b; 完成一次迭代  
```java  
class Solution {  
    public int fib(int n) {  
        if(n == 0 || n == 1){  
            return n;  
        }  
        int a = 1, b = 0;  
        for(int i = 1; i < n; i++){  
            a = a + b;  
            b = a - b;  
            a %= 1000000007;  
        }  
        return a;  
    }  
}  
```  
### 5. 旋转数组中的最小数字  
描述：把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。     
(1) 思路：旋转数组分为两个部分，使用二分法，分为三种情况：  
nums[mid] < nums[high]：说明最小值在右半部分，令low = mid+1  
nums[mid] > nums[high]：说明最小值在左半部分，令high = mid  
nums[mid] == nums[high]：无法判断，则减小区间，high--  
```java  
class Solution {  
    public int minArray(int[] numbers) {  
        int low = 0;  
        int high = numbers.length - 1;  
        while(low < high){  
            int mid = low + (high - low)/2;  
            if(numbers[high] < numbers[mid]){  
                low = mid + 1;  
            }  
            else if(numbers[high] > numbers[mid]){  
                high = mid;  
            }  
            else{  
                high--;  
            }  
        }  
        return numbers[low];  
    }  
}  
```  
时间复杂度：O(logn)，空间复杂度O(1)  
### 6. 二进制中1的个数  
描述：请实现一个函数，输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。（输入为32位二进制串）   
注：算术左移`<<`和算术右移`>>`主要用来进行有符号数的倍增、减半；  
    逻辑右移`>>>`主要用来进行无符号数的倍增、减半；  
(1) 思路：将该整数从低位到高位与1相与，直到该整数为0，记录1的个数。  
```java  
public class Solution {  
    // you need to treat n as an unsigned value  
    public int hammingWeight(int n) {  
        int count = 0;  
        while(n != 0){  
            count += (n & 1);  
            n = n >>> 1; // 无符号右移  
        }  
        return count;  
        
    }  
}  
```  
时间复杂度：O(logn)，空间复杂度：O(1)  
### 7. 数值的整数次方  
描述：实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。  
(1) 思路：myPow(double x, int n)，采用递归，  
首先考虑n的值，当n为0时，输出1；n<0时，可以取1/x，将n转换为正数进行运算。  
之后判断n的奇偶，n为偶数时，如myPow(3, 8) == myPow(3*3, 8/2)；n为奇数时，提取出一个x，然后n/2，如myPow(3, 9) == 3 * myPow(3 * 3, 4)。  
```java  
class Solution {  
    public double myPow(double x, int n) {  
        if(n == 0)  return 1;  
        if(n < 0){  
            return 1/x * myPow(1/x, -n-1);  // 提取出一个1/x防止溢出  
        }  
        return (n % 2 == 0) ? myPow(x*x, n/2) : x * myPow(x*x, n/2); // 判断奇偶  
    }  
}  
```  
(2) 思路：非递归方式（待）  
### 8. 删除链表的结点  
描述：给定单向链表的头指针和一个要删除的结点的值，定义一个函数删除该结点。  
返回删除后的链表的头结点。    
(1) 思路：首先判断边界值，链表为空和删除头结点的情况，然后设置两个辅助指针，用于循环链表和发现结点时的删除操作。  
java版本：  
```java  
class Solution {  
    public ListNode deleteNode(ListNode head, int val) {  
        if(head == null){  
            return null;  
        }  
        if(head.val == val){  
            return head.next;  
        }  
        ListNode pre = head;  
        ListNode cur = head.next;  
        while(cur != null){  
            if(cur.val == val){  
                pre.next = cur.next;  
                return head;  
            }  
            else{  
                pre = cur;  
                cur = cur.next;  
            }  
        }  
        return head;  
    }  
}  
```  
javascript版本：  
```javascript  
/**  
 * Definition for singly-linked list.  
 * function ListNode(val) {  
 *     this.val = val;  
 *     this.next = null;  
 * }  
 */  
/**  
 * @param {ListNode} head  
 * @param {number} val  
 * @return {ListNode}  
 */  
var deleteNode = function(head, val) {  
    if(!head)  return null;  
    if(head.val == val)  return head.next;  
    var pre = head;  // var  
    var cur = head.next;  
    while(cur != null){  
        if(cur.val == val){  
            pre.next = cur.next;  
            return head;  
        }  
        else{  
            pre = cur;  
            cur = cur.next;  
        }  
    }  
    return head;  
};  
```  
时间复杂度：O(n)，空间复杂度O(1)  
### 9. 调整数组顺序使奇数位于偶数前面  
描述：输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。  
(1) 思路：使用双指针，类似快排比较元素，若头指针为奇数，则向后移动一位，若尾指针为偶数，则向前移动一位，然后交换头尾指针指向的奇偶数。  
```java  
class Solution {  
    public int[] exchange(int[] nums) {  
        int i = 0, j = nums.length - 1;  
        while(i < j){  
            while(i < j && nums[i] % 2 != 0){  // 注意 i < j  
                i++;  
            }  
            while(i < j && nums[j] % 2 == 0){  
                j--;  
            }  
            if(i < j){  
                int tmp = nums[i];  
                nums[i] = nums[j];  
                nums[j] = tmp;  
                i++;  
                j--;  
            }  
        }  
        return nums;  
    }  
}  
```  
时间复杂度：O(n)，空间复杂度O(1)  
### 10. 链表中倒数第k个结点  
描述：输入一个链表，输出该链表中倒数第k个结点。如给定一个链表: 1->2->3->4->5， 和 k = 2，返回链表 4->5。  
(1) 思路：使用快慢指针，快指针先走k步，则快指针为空时，慢指针刚好走到倒数第k个结点。  
```java  
class Solution {  
    public ListNode getKthFromEnd(ListNode head, int k) {  
        ListNode p = head;  
        while(k > 0){  
            p = p.next;  
            k--;  
        }  
        while(p != null){  
            p = p.next;  
            head = head.next;  
        }  
        return head;  
    }  
}  
```  
时间复杂度O(n)，空间复杂度O(1)  
### 11. 反转链表  
描述：定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。  
(1) 思路：利用三个辅助指针，pre，cur和next，注意pre的初始值，遍历链表更改指针方向。  
```java  
class Solution {  
    public ListNode reverseList(ListNode head) {  
        if(head == null){  
            return null;  
        }  
        ListNode cur = head;  
        ListNode pre = null;  // 第一个结点前为null  
        ListNode next = null;  
        while(cur != null){  
            next = cur.next;  
            cur.next = pre;  
            pre = cur;  
            cur = next;  
        }  
        return pre;  
    }  
}  
```  
时间复杂度：O(n)，空间复杂度O(1)  
### 12. 合并两个有序链表  
描述：输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。  
(1) 思路：首先判断边界条件，一个链表为空时，直接输出第二个链表。然后初始化一个伪头结点，接着使用一个辅助指针遍历，根据l1和l2结点值大小链接，最后处理未空的链表。  
```java  
class Solution {  
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {  
        if(l1 == null)  return l2;  
        if(l2 == null)  return l1;  
        ListNode l = new ListNode(0);  
        ListNode head = l;  
        while(l1 != null && l2 != null){  
            if(l1.val > l2.val){  
                head.next = l2;  
                l2 = l2.next;  
            }  
            else{  
                head.next = l1;  
                l1 = l1.next;  
            }  
            head = head.next;  // 不要忘记这一步！  
        }  
        head.next = l1 != null ? l1 : l2;  
        return l.next;  
    }  
}  
```  
时间复杂度：O(m+n)，空间复杂度O(1)，使用了常数大小的额外空间  
### 13. 包含最小值min函数的栈  
定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。  
1. 思路：使用辅助栈，一个栈用来实现push和pop，另一个栈用来存储入栈的最小值。当出栈时，若最小值也出栈了，则最小值栈也同样执行pop操作。最小值栈的栈顶永远是当前栈中的最小值。  
注：java中栈存放的是Integer，如果比较数值需要使用equals()方法，另外，java栈只有peek()方法，没有top()方法。  

java版本：  
```java  
class MinStack {  

    Stack<Integer> stack, minStack;  

    /** initialize your data structure here. */  
    public MinStack() {  
        stack = new Stack<>();  
        minStack = new Stack<>();  
    }  
    
    public void push(int x) {  
        stack.push(x);  
        if(minStack.isEmpty() || x <= minStack.peek()){   // 注意一定是小于等于，相等也要入栈  
            minStack.push(x);  
        }  
    }  
    
    public void pop() {  
        if( stack.pop().equals(minStack.peek()) ){  // equals()方法  
            minStack.pop();  
        }  
    }  
    
    public int top() {  
        return stack.peek();  // peek()方法返回栈顶值  
    }  
    
    public int min() {  
        return minStack.peek();  
    }  
}  
```  
js版本：注意this的使用，如果不使用this变量定义要在函数外才能作用于全局  
```javascript  
var MinStack = function() {  
    this.stack = [];  
    this.minStack = [];  
};  

MinStack.prototype.push = function(x) {  
    this.stack.push(x);  
    if(this.minStack.length == 0 || x <= this.minStack[this.minStack.length - 1]){  
        this.minStack.push(x);  
    }  
};  

MinStack.prototype.pop = function() {  
    if(this.stack.pop() == this.minStack[this.minStack.length - 1]){  
        this.minStack.pop();  
    }  
};  

MinStack.prototype.top = function() {  
    return this.stack[this.stack.length - 1];  
};  

MinStack.prototype.min = function() {  
    return this.minStack[this.minStack.length - 1];  
};  
```  
1. 思路：使用链表实现，手写一个链表结构，每个结点存储一个值和当前链表的最小值，新建结点实现push，移动指针实现pop。  

java版本：  
```java  
class MinStack {  

    private class Node{  // 手写链表数据结构  
        int val;  
        int min;  
        Node next;  
        public Node(int val, int min, Node next){  
            this.val = val;  
            this.min = min;  
            this.next = next;  
        }  
    }  
    private Node head;  // 新建一个头结点  

    /** initialize your data structure here. */  
    public MinStack() {  

    }  
    
    public void push(int x) {  
        if(head == null){  
            head = new Node(x, x, null);  
        }  
        else{  
            head = new Node(x, Math.min(head.min, x), head); // 关键一步  
        }  
    }  
    
    public void pop() {  
        head = head.next;  
    }  
    
    public int top() {  
        return head.val;  
    }  
    
    public int min() {  
        return head.min;  
    }  
}  
```  
js版本：(待)  
```javascript  

```  
### 14. 顺时针打印矩阵  
描述：输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。  
(1) 思路：硬核输出，设置left，right，top，bottom变量，使用4个for循环套在while中按照顺时针逐圈输出。  
注意：边界条件，当矩阵为空时的输出；  
left，right，top，bottom的起始值；  
while的判断条件，设置为true，根据四个变量的值进行调节；  
每次for循环打印前，判断变量的相互大小；  
for循环中初始值以及判断条件中是否要使用等于。  
```java  
class Solution {  
    public static int[] spiralOrder(int[][] matrix) {  
        int hang = matrix.length;  
        if(hang == 0)  return new int[0];  
        int lie = matrix[0].length;  
        int[] result = new int[hang * lie];  

        int left = 0, right = lie - 1;  // -1  
        int top = 0, bottom = hang - 1;  
        int i = 0,  k = 0;  
        while(true){  
            // 从左向右走  
            for(i = left; i <= right; i++){   // 这里使用<=  
                result[k++] = matrix[top][i];  
            }  
            // 从上向下走  
            if(++top > bottom)  break;  // for循环前先做判断  
            for(i = top; i <= bottom; i++){  
                result[k++] = matrix[i][right];  
            }  
            
            // 从右向左走  
            if(--right < left)  break;  // for循环前先做判断  
            for(i = right; i >= left; i--){  
                result[k++] = matrix[bottom][i];  
            }  
            
            // 从下向上走  
            if(--bottom < top)  break;  // for循环前先做判断  
            for(i = bottom; i >= top; i--){  
                result[k++] = matrix[i][left];  
            }  

            // 进行下一次循环之前，先作判断  
            if(++left > right)  break;  
        }  
        return result;  
    }  
}  
```  
时间复杂度：O(m*n)，空间复杂度O(1)  
### 15. 栈的压入、弹出序列  
描述：输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。  
输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]  
输出：true  
(1) 思路：判断栈的弹出顺序，则使用一个栈进行模拟，首先按照push顺序入栈，每次入栈判断栈顶元素和pop序列是否相同，相同则出栈，直到栈空。  
```java  
class Solution {  
    public static boolean validateStackSequences(int[] pushed, int[] popped) {  
        if(pushed.length != popped.length)  return false;  
        if(pushed.length == 0)  return true;  
        Stack<Integer> stack = new Stack<>();  
        int j = 0;  
        for(int num : pushed){  
            stack.push(num);  
            // 注意while的判断条件，不可缺少  
            while(!stack.isEmpty() && j < popped.length && stack.peek() == popped[j] ){  
                stack.pop();  
                j++;  // 向后移动  
            }  
        }  
        return stack.isEmpty();  
    }  
}  
```  
时间复杂度：O(n)，空间复杂度：O(1)  
### 16. 复杂链表的复制  
描述：复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。  
(1) 思路：最优为原地操作，第一步依次复制每个结点，并链接在原结点后面，第二步链接random指针，新链表random指针指向原链表random指针指向结点的下一个结点，第三步将链表一分为二。注意判断条件和边界值。  
```java  
/*  
// Definition for a Node.  
class Node {  
    int val;  
    Node next;  
    Node random;  

    public Node(int val) {  
        this.val = val;  
        this.next = null;  
        this.random = null;  
    }  
}  
*/  
class Solution {  
    public Node copyRandomList(Node head) {  
        if(head == null)  return null;  
        
        Node cur = head;  
        // 依次复制每个结点  
        while(cur != null){  
            Node copyNode = new Node(cur.val);  
            copyNode.next = cur.next;  
            cur.next = copyNode;  
            cur = cur.next.next;  
        }  
        cur = head;  
        // 复制random指针  
        while(cur != null){  
            if(cur.random == null)  
                cur.next.random = null;  
            else  
                cur.next.random = cur.random.next;  
            cur = cur.next.next;  
        }  
        cur = head;  
        Node p = head.next;  // 工具人  
        Node copyHead = head.next;  // 保存结果  
        // 将链表一分为二  
        while(cur != null){  
            cur.next = cur.next.next;  
            cur = cur.next;  
            if(p.next != null){  // 加上判断条件  
                p.next = p.next.next;  
                p = p.next;  
            }  
        }  
        return copyHead;  
    }  
}  
```  
时间复杂度：O(n)，空间复杂度：O(1)  
### 17. 数组中出现次数超过一半的数字  
数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。  
输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]  
输出: 2  
(1) 思路：摩尔投票法，相等+1，不相等-1，当一个数字超过数组长度一半时，得到的投票数肯定大于0，至于其他数字都会被抵消为0.  
```java  
class Solution {  
    public int majorityElement(int[] nums) {  
        int count = 0;  
        int x = 0;  
        for(int num : nums){  
            if(count == 0)  x = num; // 当count为0时x重新赋值  

            count += (x == num) ? 1 : -1;  // 投票法  
        }  
        return x;  
    }  
}  
```  
时间复杂度：O(n)，空间复杂度：O(1)  
### 18. 二叉树的镜像  
请完成一个函数，输入一个二叉树，该函数输出它的镜像（以根为轴旋转180度）。  
(1) 递归，首先交换根结点的左右子树，然后递归分别取左右子树  
```java  
/**  
 * Definition for a binary tree node.  
 * public class TreeNode {  
 *     int val;  
 *     TreeNode left;  
 *     TreeNode right;  
 *     TreeNode(int x) { val = x; }  
 * }  
 */  
class Solution {  
    public TreeNode mirrorTree(TreeNode root) {  
        if(root == null)  return null;  

        TreeNode t = root.right;  
        root.right = root.left;  
        root.left = t;  
        
        mirrorTree(root.left);  // 递归过程中root并没有赋新值，只是依次向下取结点的left和right  
        mirrorTree(root.right);  

        return root;  
    }  
}  
```  
### 19. 对称的二叉树  
请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。  
(1) 递归  
使用递归方法时分为以下三步进行思考：    
1.递归的函数作用是什么  
判断二叉树是否对称，输入为TreeNode left和TreeNode right，输出为true或false  
2.递归的终止条件是什么  
左结点和右结点都为空、到底了还是true，返回true  
左结点为空时右结点不为空，反正一样，或者中间出现false，返回false  
左右结点值不相等，返回false  
3.从某层到下一层的关系是什么？  
调用递归函数传入左左和又又  
调用递归函数传入左右和右左  
```java  
class Solution {  
    public boolean isSymmetric(TreeNode root) {  
        if(root == null)  return true;  

        return judge(root.left, root.right);  
    }  
    public static boolean judge(TreeNode root1, TreeNode root2){  
        if(root1 == null && root2 == null)  return true;  
        if(root1 == null || root2 == null)  return false;  

        // 多个条件  
        return root1.val == root2.val && judge(root1.left, root2.right) && judge(root1.right, root2.left);  
    }  
}  
```  
### 20. 树的子结构  
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)  
B是A的子结构，即A中有出现和B相同的结构和节点值。  
(1) 递归：自顶向下  
1. 从A的根节点开始判断与B是否相同，相同满足什么？就是A的值与B相等，然后A的左子树与B的左子树相同，A的右子树和B的右子树相同。这就形成了一个递归函数，将其独立出来。  
2. 除了以上从A的根节点开始判断之外，B也可能存在A的左子树子结构中，也可能存在于A的右子树子结构中，因此这也形成了一个递归，加上上面的判断条件，就得出了最终结果。  
```java  
class Solution {  
    public boolean isSubStructure(TreeNode A, TreeNode B) {  
        if(A == null || B == null)  return false;  
        return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);  
    }  
    public boolean dfs(TreeNode A, TreeNode B){  
        if(B == null)  return true;  
        if(A == null)  return false;  
        return A.val == B.val && dfs(A.left, B.left) && dfs(A.right, B.right);  
    }  
}  
```  
### 21. 从上到下打印二叉树 ||  
从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。  
例如:  
给定二叉树: [3,9,20,null,null,15,7],  
返回其层次遍历结果：  
[  
  [3],  
  [9,20],  
  [15,7]  
]  
(1) 二叉树的层序遍历，使用LinkedList模拟队列的操作，然后使用ArrayList分别存储每一层的值。当队列不为空时，对出队的结点进行访问。如何入队一行的结点，这里要设置一个count等于初始队列的长度，然后在循环中访问每个结点，再将每个结点的左右子树入队。  
```java  
class Solution {  
    public List<List<Integer>> levelOrder(TreeNode root) {  
        List<List<Integer>> list = new LinkedList<>();  
        if(root == null)  return list;  
        Queue<TreeNode> queue = new LinkedList<>();  
        queue.add(root);  

        while(!queue.isEmpty()){  
            int count = queue.size();  // 设置count  
            List<Integer> li = new LinkedList<>();  
            while(count > 0){  // 将一整行的值入队  
                TreeNode node = queue.remove();  
                li.add(node.val);  
                if(node.left != null)  
                    queue.add(node.left);  
                if(node.right != null)  
                    queue.add(node.right);  
                count--;  
            }  
            list.add(li);  // 添加一个一行数据元素  
        }  
        return list;  

    }  
}  
```  
### 22. 从上到下打印二叉树 |||  
请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。  
例如:  
给定二叉树: [3,9,20,null,null,15,7],  
返回其层次遍历结果：  
[  
  [3],  
  [20,9],  
  [15,7]  
]  
(1) 本题使用双端队列LinkedList进行处理，在奇数层将元素从尾部添加，在偶数层将元素从头部添加，这样出队的顺序都是层序遍历顺序，而元素访问则会在奇偶层不同。  
```java  
class Solution {  
    public List<List<Integer>> levelOrder(TreeNode root) {  
        List<List<Integer>> list = new LinkedList<>();  
        if(root == null)  return list;  
        Queue<TreeNode> queue = new LinkedList<>();  
        queue.add(root);  
        int n = 1;  // 加入奇偶层数  

        while(!queue.isEmpty()){  
            int count = queue.size();  
            // 注意这里只能使用LinkedList进行声明，不能用List  
            LinkedList<Integer> li = new LinkedList<>();  
            while(count > 0){  
                TreeNode node = queue.remove();  
                // 根据奇偶添加到li尾部或头部  
                if(n % 2 == 0)  li.addFirst(node.val);  
                else  li.add(node.val);  
                if(node.left != null)  
                    queue.add(node.left);  
                if(node.right != null)  
                    queue.add(node.right);  
                count--;  
            }  
            n++;  // +1  
            list.add(li);  

        }  
        return list;  
    }  
}  
```  
### 23. 二叉搜索树的后序遍历序列  
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。  
输入: [1,3,2,6,5]  
输出: true  
(1) 寻找题意。  
二叉搜索树特点：左子树 < 根节点 < 右子树  
后续遍历特点：数组中最后一个结点为根节点  
两者结合，得数组中从前向后和根节点数值相比，出现比根结点大的值说明其处于右子树，则左边为左子树，然后使用递归再分别判断左右子树是不是一颗二叉搜索树。  
```java  
class Solution {  
    public boolean verifyPostorder(int[] postorder) {  
        if(postorder.length <= 1)  
            return true;  
        // 引入辅助函数，传入左右边界的值  
        return helper(postorder, 0, postorder.length-1);  
    }  
    public boolean helper(int[] postorder, int left, int right){  
        // 边界不满足条件，说明已经递归到最后，直接返回true  
        if(left >= right)  return true;  
        int root = postorder[right];  
        int k = left;  
        // 从左向右比较  
        while(k < right && postorder[k] < root){  
            k++;  
        }  
        for(int i = k; i < right; i++){  
            if(postorder[i] < root)  
                return false;  
        }  
        // 分别判断左右子树的值  
        // 相当于return true && helper(postorder, left, k-1) && helper(postorder, k, right-1);  
        if(!helper(postorder, left, k-1))  return false;  
        if(!helper(postorder, k, right-1))  return false;  
        return true;  
    }  
}  
```  
### 24. 序列化二叉树  
请实现两个函数，分别用来序列化和反序列化二叉树。  
二叉树序列化是指将一颗二叉树结构使用数组或者字符串的形式输出，根据题目要求使用相应的遍历方法，如前序遍历或中序遍历等。
反序列化是根据提供的数组或者字符串，还原二叉树的结构。
**方法：


### 25. 丑数  
我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。  
输入: n = 10  
输出: 12  
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。  
**解题思路**：由于丑数只包含2、3、5，那么它一定在以下三个数组中：  
[1, 1\*2, 2\*2, 3\*2 ...]  
[1, 1\*3, 2\*3, 3\*3 ...]  
[1, 1\*5, 2\*5, 3\*5 ...]  
现在任务变成合并三个有序数组，使用三个指针指向三个数组中的第一位，每次找出最小值，然后右移相应的指针，注意当数值相同时，每个指针都要右移一位，去除重复元素。  
```java  
class Solution {  
    public int nthUglyNumber(int n) {  
        if(n <= 0)  
            return -1;  
        int[] ugly = new int[n];  
        ugly[0] = 1;  
        int i2 = 0, i3 = 0, i5 = 0;  
        for(int i = 1; i < n; i++){  
            // 使用*2，*3，*5模拟三个数组，找出最小值  
            int tmp = Math.min(ugly[i2]*2, Math.min(ugly[i3]*3, ugly[i5]*5));  
            
            if(tmp == ugly[i2]*2)  i2++;  
            if(tmp == ugly[i3]*3)  i3++;  
            if(tmp == ugly[i5]*5)  i5++;  

            ugly[i] = tmp;  
        }  
        return ugly[n-1];  
    }  
}  
```  
### 26. 数组中数字出现的次数  
一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。  
输入：nums = [4,1,4,6]  
输出：[1,6] 或 [6,1]  
**方法：位运算**  
异或运算（^）性质：  
交换律：A ^ B = B ^ A  
结合律：A ^ (B ^ C) = (A ^ B) ^ C  
0和任何数异或：0 ^ A = A  
自身异或：A ^ A = 0  
由上，数组中所有数字的异或就等于两个只出现了一次的数字异或，首先我们得到这个结果，然后找到结果中最低位的1，按照该数字将数组分组，由于相同的数肯定会分到一组，而这时候两个只出现了一次的数字肯定在不同组，分组异或得到最终的两个数字。  
```java  
class Solution {  
    public int[] singleNumbers(int[] nums) {  
        int res = 0;  
        // 全部异或值  
        for(int num : nums){  
            res ^= num;  
        }  
        // 找到最低位为1的数字  
        int key = 1;  
        while((key & res) == 0){  
            key <<= 1;  // key左移寻找  
        }  

        // 分组异或  
        int a = 0, b = 0;  
        for(int num : nums){  
            if((num & key) == 0){  // 根据key分组  
                a ^= num;  
            }  
            else{  
                b ^= num;  
            }  
        }  
        return new int[]{a, b};  
    }  
}  
```  
### 27. 数组中数字出现的次数 II  
在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。  
输入：nums = [9,1,7,9,7,9,7]  
输出：1  
**方法1：map**  
使用HashMap结构，遍历数组，存储每个数字以及其出现的频率，然后再遍历找到只出现一次的元素。  
```java  
class Solution {  
    public int singleNumber(int[] nums) {  
        HashMap<Integer, Integer> map = new HashMap<>();  
        for(int i = 0; i < nums.length; i++){  
            if(map.containsKey(nums[i])){  
                map.put(nums[i], map.get(nums[i])+1);  
            }  
            else  
                map.put(nums[i], 1);  
        }  
        for(int i = 0; i < nums.length; i++){  
            if(map.get(nums[i]) == 1)  
                return nums[i];  
        }  
        return -1;  

    }  
}  
```  
**方法2：位运算**  
使用一个长度为32的数组存储数字的二进制1在各个位置上出现的次数，由于除了一个数字出现一次之外，其他数字都出现了3次，因此，数组中的相应位置的个数如果不是3的倍数，说明该数字在这一位上的值为1，使用二进制转为10进制，得出该数字。  
```java  
class Solution {  
    public int singleNumber(int[] nums) {  
        int[] bit = new int[32];  
        // 求出每个位置1出现的次数  
        for(int num: nums){  
            for(int i = 31; i >= 0; i--){  
                bit[i] += num & 1;  
                num >>= 1;  
            }  
        }  

        int res = 0;  
        for(int i = 31; i >= 0; i--){  
            if(bit[i] % 3 != 0){  
                res += Math.pow(2, 31-i); // 转换为10进制  
            }  
        }  
        return res;  
    }  
}  
```  
### 28. 和为s的两个数字  
输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。  
输入：nums = [2,7,11,15], target = 9  
输出：[2,7] 或者 [7,2]  
**方法一：Set**  
遍历数组，使用Set存储数字，首先判断Set中是否包含target-当前元素，如果包含，则直接输出，不包含则继续遍历。  
```java  
class Solution {  
    public int[] twoSum(int[] nums, int target) {  
        Set<Integer> set = new HashSet<>();  
        
        for(int num: nums){  
            if(!set.contains(target-num)){  
                set.add(num);  
            }  
            else  
                return new int[]{num, target-num};  
        }  

        return new int[0];  
    }  
}  
```  
**方法二：二分法**  
遍历数组，得到数组中每一位的target-num值，然后使用二分查找去剩下的数组中寻找该值。  
```java  
class Solution {  
    public int[] twoSum(int[] nums, int target) {  
        for(int i = 0; i < nums.length; i++){  
            int key = target - nums[i];  
            int t = 0;  
            if(key > nums[i])  
                t = binarySearch(nums, i+1, nums.length-1, key);  
            if(i-1 >= 0 && key < nums[i])  
                t = binarySearch(nums, 0, i-1, key);  
            if(t != 0)  
                return new int[]{nums[i], t};  
        }  
        return new int[0];  
    }  
    // 二分查找  
    public int binarySearch(int[] nums, int left, int right, int target){  
        while(left <= right){  
            int mid = left + (right-left)/2;  
            if(nums[mid] == target){  
                return nums[mid];  
            }  
            else if(nums[mid] > target){  
                right = mid-1;  
            }  
            else{  
                left = mid+1;  
            }  
        }  
        return 0;  
    }  
}  
```  
**方法三：双指针**  
递增的数组中，使用两个指针指向数组两端，然后求出他们的和，如果大于target，则右指针向左移，如果小于target，则左指针向右移。  
```java  
class Solution {  
    public int[] twoSum(int[] nums, int target) {  
        int i = 0, j = nums.length-1;  
        while(i < j){  
            int sum = nums[i] + nums[j];  
            if(sum > target)  
                j--;  
            else if(sum < target)  
                i++;  
            else  
                return new int[]{nums[i], nums[j]};  
        }  
        return new int[0];  
    }  
}  
```  
### 29. 和为s的连续正数序列  
输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。  
序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。  
输入：target = 15  
输出：[[1,2,3,4,5],[4,5,6],[7,8]]  
**方法：滑动窗口**  
使用一个滑动窗口，l为左边界，r为右边界，窗口中的值为连续值。  
窗口中的数字和小于target时，循环中逐步增大右边界，然后其中当窗口中的和大于target时，和减去左边界，然后左边界右移。等于target时就获得了一个解。  
```java  
class Solution {  
    public int[][] findContinuousSequence(int target) {  
        // int[]型集合类  
        List<int[]> list = new ArrayList<>();  

        int sum = 0;  
        for(int l = 1, r = 1; r < target; r++){  
            sum += r;  // 小于target时增大右区间  
            while(sum > target){ // 右区间确定时，大于则增大左区间  
                sum -= l;  
                l++;  
            }  
            if(sum == target){  
                int[] tmp = new int[r-l+1];  
                for(int i = 0; i < tmp.length; i++){  
                    tmp[i] = l + i;  // 添加元素，l+i  
                }  
                list.add(tmp);  
            }  
        }  

        // 注意添加二维数组的方法  
        int[][] res = new int[list.size()][];  
        for(int i = 0; i < res.length; i++){  
            res[i] = list.get(i);  
        }  

        return res;  
    }  
}  
```  
### 30. 翻转单词的顺序  
输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。  
输入: "  hello  world!  "  
输出: "world! hello"  
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。  
如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。  
**方法：利用trim()和StringBuilder**  
trim()的作用是去掉字符串两端的多余的空格  
```java  
class Solution {  
    public String reverseWords(String s) {  
        // 首先使用trim()去除s前后空格，然后转换为数组  
        String[] str = s.trim().split(" ");  
        StringBuilder sb = new StringBuilder();  
        for(int i = str.length-1; i >= 0; i--){  
            // str[i]为空时，不添加  
            if(str[i].equals(""))  
                continue;  
            
            sb.append(str[i].trim());  
            sb.append(" ");  
        }  
        return sb.toString().trim(); // 最后去掉尾部空格  
    }  
}  
```  
### 31. 左旋转字符串  
字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。  
输入: s = "abcdefg", k = 2  
输出: "cdefgab"  
可以使用StringBuilder实现，也可以直接使用substring()实现  
```java  
class Solution {  
    public String reverseLeftWords(String s, int n) {  
        if(n == 0)  return s;  
        return s.substring(n) + s.substring(0, n);  
    }  
}  
```  
### 32. 滑动窗口的最大值  
给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。  
示例:  
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3  
输出: [3,3,5,5,6,7]  
解释:  
  滑动窗口的位置                最大值  
---------------               -----  
[1  3  -1] -3  5  3  6  7       3  
 1 [3  -1  -3] 5  3  6  7       3  
 1  3 [-1  -3  5] 3  6  7       5  
 1  3  -1 [-3  5  3] 6  7       5  
 1  3  -1  -3 [5  3  6] 7       6  
 1  3  -1  -3  5 [3  6  7]      7  
**方法一：暴力法**  
在滑动窗口中每次从左向右找到最大值，加入数组。  
```java  
class Solution {  
    public int[] maxSlidingWindow(int[] nums, int k) {  
        if(nums.length == 0 || k == 0)  return new int[0];  
        int[] max = new int[nums.length-k+1];  
        for(int i = k; i <= nums.length; i++){  
            int m = Integer.MIN_VALUE;  
            for(int j = i-k; j < i; j++){  
                if(nums[j] > m)  
                    m = nums[j];  
            }  
            max[i-k] = m;  
        }  
        return max;  
    }  
}  
```  
**方法二：单调双端队列**  
使用一个双端队列，首先i从0开始，到滑动窗口k，在遍历这一段数据时尚未形成一个完整的滑动窗口，遍历完成之后可以得到第一个最大的值。如何遍历？需要保持队列中的数据是从左向右单调递减的。所以就在循环中判断当前值是否比队尾值大？如果更大，则队尾出队，直到找到一个更大的数或者队列为空，这时队列中的数字要么为1个最大值，要么单调递减。先保存第一个最大值。  
形成窗口之后，i从k开始继续向右滑动，首先要判断之前的最大值是否还存在新的窗口之中，用i-k表示窗口外的第一个数与之前的队首最大值作比较，相等则表示该最大值已经不在新的滑动窗口中了。  
然后继续循环如以上方式维持队列单调递减，把队首的最大值依次保存即可。  
```java  
class Solution {  
    public int[] maxSlidingWindow(int[] nums, int k) {  
        if(nums.length == 0 || k == 0)  
            return new int[0];  
        int[] max = new int[nums.length-k+1];  
        int index = 0;  
        // 双向队列  
        Deque<Integer> queue = new LinkedList<>();  
        for(int i = 0; i < k; i++){  
            // 使用while循环将比当前数字小的数移出  
            while(!queue.isEmpty() && nums[i] > queue.peekLast()){  
                queue.removeLast();  
            }  
            // 加入当前数字  
            queue.add(nums[i]);  
        }  
        // 先保存第一个数  
        max[index++] = queue.peekFirst();  
        for(int i = k; i < nums.length; i++){  
            // 若i-k表示的值与队首最大值相等，说明该最大值已经不在新的窗口中了  
            if(nums[i-k] == queue.peekFirst())  
                queue.removeFirst();  
            // 继续使用while维持队列递减  
            while(!queue.isEmpty() && nums[i] > queue.peekLast()){  
                queue.removeLast();  
            }  
            queue.add(nums[i]);  
            // 第一个数加入数组  
            max[index++] = queue.peekFirst();  
        }  
        return max;  
    }  
}  
```  
### 33.  队列的最大值  
请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。  
若队列为空，pop_front 和 max_value 需要返回 -1  
示例 1：  
输入:  
["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]  
[[],[1],[2],[],[],[]]  
输出: [null,null,null,2,1,2]  
**方法：双端队列，滑动窗口**  
使用两个双端队列，一个用于push和pop操作，另一个用来帮助存储最大值。存储最大值的队列使用滑动窗口方法，保持单调递减，返回最大值的话直接是队首值。  
```java  
class MaxQueue {  

    Deque<Integer> queue;  
    Deque<Integer> max;  
    public MaxQueue() {  
        queue = new LinkedList<>();  
        max = new LinkedList<>();  
    }  
    
    public int max_value() {  
        return queue.isEmpty() ? -1 : max.peek();  
    }  
    
    public void push_back(int value) {  
        queue.add(value);  
        while(!max.isEmpty() && value > max.peekLast()){  
            // 注意removeLast，LinkedList中remove的默认值是first  
            max.removeLast();  
        }  
        max.add(value);  
    }  
    
    public int pop_front() {  
        if(queue.size() == 0)  
            return -1;  
        // 最好使用equals()比较  
        if(queue.peekFirst().equals(max.peekFirst()))  
            max.removeFirst();  
        return queue.removeFirst();  
    }  
}  
```  
### 34. n个骰子的点数  


### 35. 扑克牌中的顺子  
从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。  
输入: [1,2,3,4,5]  
输出: True  
**方法：max-min < 5**  
5张牌中要是没有0，则5张牌数字必连续，然后最大值减去最小值等于4。如果存在0，由于0可以当作任意一张牌，因此只要剩余的牌不相等，然后最大值减去最小值满足小于5，则必定能构成顺子。  
使用Set结构存储非0元素，添加判断条件，然后返回最大值减去最小值的结果。  
```java  
class Solution {  
    public boolean isStraight(int[] nums) {  
        int joker = 0;  
        int max = 0, min = 14;  // 最大值初始设为0，最小设为14  
        Set<Integer> set = new HashSet<>();  
        for(int i = 0; i < nums.length; i++){  
            // 不存储0元素  
            if(nums[i] == 0)  
                continue;  
            // 有重复元素直接return false  
            if(set.contains(nums[i]))  
                return false;  
            // 得到最大值和最小值  
            max = Math.max(nums[i], max);  
            min = Math.min(nums[i], min);  
            set.add(nums[i]);  
        }  
        return max-min < 5;  
    }  
}  
```  
### 36. 约瑟夫环  
0,1,,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。  
例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。  
示例：  
输入: n = 5, m = 3  
输出: 3  
**方法：倒推**  
首先关注一个点，就是最后剩余的数字在数组中的索引值变化。当一轮一轮进行数字删除时，每轮过后索引的第一位数字就是被删除数字的下一位，这时候索引为0.然后删除到最后剩下一个数字，这时候最后的数字索引为0且仅有一个。  
使用倒推方法，将上一轮删除的数字添加回来，然后数组右移m个位置，溢出的元素补到前面，即可得到上一轮的完整序列。这时候剩余数字的索引值变化规律为：(当前索引index + m) % 当前序列长度。一直递推到原始数组，得出初始索引结果。  
```java  
class Solution {  
    public int lastRemaining(int n, int m) {  
        int pos = 0;  
        for(int i = 2; i <= n; i++){  
            pos = (pos + m) % i;  
        }  
        return pos;  
    }  
}  
```  
### 37. 求1+2+…+n  
求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。  
**方法：&的短路**  
不能使用循环，则递归进行，不能使用if判断，则使用&的短路性质，当前一个条件不满足时，后一个直接不执行。  
```java  
class Solution {  
    public int sumNums(int n) {  
        int sum = n;  
        // &短路，当 n<0 时后面不执行，则输出当前sum  
        boolean flag = n > 0 && (sum += sumNums(n-1)) > 0;  
        return sum;  
    }  
}  
```  
### 38. 不用加减乘除做加法  
写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。  
**方法：位运算**  
异或（^）相当于无进制数的求和，如19+1=20，而异或为10，不考虑进位。  
与（&）相当于求进位数，因为两者都为1时，&才为1，相当于进位。  

```java  
class Solution {  
    public int add(int a, int b) {  
        while(b != 0){  
            int tmp = a ^ b;  
            b = (a & b) << 1;  
            a = tmp;  
        }  
        return a;  

    }  
}  
```  
### 39. 构建乘积数组  
给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B 中的元素 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。  
输入: [1,2,3,4,5]  
输出: [120,60,40,30,24]  
**方法：对称遍历**  
由于B[i]求的是除去A[i]后剩余数的乘积，那么使用两个乘积数组辅助，  
C[i]表示a数组从第0项乘到i-1项的乘积，  
D[i]表示从i+1到n-1项的乘积，  
C[i] * D[i]，就是B[i]。  
由以上进行简单优化，可以先用B[i]代替C[i]，从前向后遍历，再直接使用B[i]*i+1到n-1的项，从后向前遍历。  
```java  
class Solution {  
    public int[] constructArr(int[] a) {  
        int[] b = new int[a.length];  
        // 记住这个for循环的用法  
        for(int i = 0, t = 1; i < a.length; t *= a[i], i++){  
            b[i] = t;  
        }  
        for(int i = a.length-1, t = 1; i >= 0; t *= a[i], i--){  
            b[i] *= t;  // 直接相乘  
        }  
        return b;  
    }  
}  
```  
### 40. 1～n 整数中 1 出现的次数  
输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。  
例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。  
**方法：找规律+递归**  
当n = 9时，结果为1  
当n = 99时，结果为20  
当n = 999时，结果为300，  
因此，若n都由9构成，则规律为`base = (length-1) * Math.pow(10, length-2);`  
基于此规律，可以使用递归计算n中1的个数，以n = 1233举例：  
（1）1~999中1的个数为base计算，所以接下来计算n-1000  
（2）n-1000为233，注意在进行下次递归时，base先加上1，因为1233中最高位为1  
（3）233最高位为2，则包含两个99，以及100~199的100个数字中的首位1，接下来计算234-200=34  
（4）直到n<10，返回1，n=0，返回0。  
```java  
class Solution {  
    public int countDigitOne(int n) {  
        if(n == 0)  return 0;  
        if(n < 10)  return 1;  

        String s = String.valueOf(n); // 转换为字符串  
        int len = s.length();  

        // n为9，则1的个数为1；99则是20；999则是300，所以根据此规律得base  
        int base = (len-1) * (int)Math.pow(10, len-2);  

        // 得到最高位数字  
        int high = s.charAt(0) - '0';  
        int cur = (int)Math.pow(10, len-1);  // 高位数字位数  
        if(high == 1)  
            // 高位数字为1，则是当前base + 去除高位数字后剩下的1的个数  
            return base + 1 + n - cur + countDigitOne(n - high*cur);  
        else  
            // 不是1则乘以相关个数再加上当前高位数再加上减去高位数字后剩下1的个数  
            return base * high + cur + countDigitOne(n - high*cur);  
    }  
}  
```  
### 41. 数字序列中某一位的数字  
数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。  
请写一个函数，求任意第n位对应的数字。  


### 42. 把数组排成最小的数  
输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。  
输入: [3,30,34,5,9]  
输出: "3033459"  
**方法：排序**  
想要得到最小的数字，必须保证高位数字最小，将数字转换为字符串，采用字典序的排序方法进行比较。  
自定义排序规则：当a + b < b + a时，如'303' < '330'，此时a在前面，java中在lamda函数中使用compareTo()方法定义排序规则  
```java  
class Solution {  
    public String minNumber(int[] nums) {  
        // 转换为字符串  
        String[] s = new String[nums.length];  
        for(int i = 0; i < nums.length; i++){  
            s[i] = String.valueOf(nums[i]);  
        }  
        // 定义排序规则  
        Arrays.sort(s, (x, y) -> (x+y).compareTo(y+x));  
        // 使用StringBuilder添加  
        StringBuilder sb = new StringBuilder();  
        for(String t : s)  
            sb.append(t);  
        return sb.toString();  
    }  
}  
```  
### 43. 最长不含重复字符的子字符串  
请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。  
输入: "abcabcbb"  
输出: 3  
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。  
**方法：滑动窗口-哈希表**  
使用HashSet维护一个无重复值的滑动窗口，使用两个指针指向窗口左右两端。当遇到重复元素时，就从set左边开始删除元素，左指针加1，直到不含该元素，在此过程中记录最大值。不是重复元素则添加到set中。  
```java  
class Solution {  
    public int lengthOfLongestSubstring(String s) {  
        int max = 0;  
        Set<Character> set = new HashSet<>();  
        for(int left = 0, right = 0; right < s.length(); right++){  
            while(set.contains(s.charAt(right))){  
                set.remove(s.charAt(left++));  
            }  
            set.add(s.charAt(right));  
            max = Math.max(max, right-left+1);  
        }  
        return max;  
    }  
}  
```  
**方法：滑动窗口-双端队列**  
使用双端队列维护一个滑动窗口，当遇到重复元素时从队头开始删除，直到删除了该重复元素，然后从队尾添加元素。在此过程中记录最大值。  
```java  
class Solution {  
    public int lengthOfLongestSubstring(String s) {  
        Deque<Character> deque = new ArrayDeque<>();  
        int max = 0;  
        for(int i = 0; i < s.length(); i++){  
            if(!deque.contains(s.charAt(i))){  
                deque.addLast(s.charAt(i));  
            }  
            else{  
                max = Math.max(max, deque.size());  
                while(deque.peekFirst() != s.charAt(i))  
                    deque.removeFirst();  
                deque.removeFirst();  
                deque.addLast(s.charAt(i));  
            }  
        }  
        max = Math.max(max, deque.size());  
        return max;  
    }  
}  
```  
### 44. 字符串的排列（全排列）  
输入一个字符串，打印出该字符串中字符的所有排列。  
你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。  
示例：  
输入："aab"  
输出：["aab","aba","baa"]  
**方法：回溯法 + 减枝**  
回溯法就是在路径中依次选择，并在选择的路径中作处标记，等到这一路径结束时，依次回退，并改变标记，继续遍历下一路径。  
其中的递归结构：[1, 2, 3]的全排列就等于1 + [2, 3]的全排列  
状态变量数组int[] visited用于保存该值是否已经被访问  
当路径长度等于原数组长度时，说明该路径结束，将该路径添加到List中。  
减枝是为了避免重复添加路径，根据题目条件灵活使用。  
```java  
class Solution {  
    public String[] permutation(String s) {  
        List<String> list = new ArrayList<>();  // 保存路径的list  
        int[] visited = new int[s.length()];  // 状态变量  
        char[] charArray = s.toCharArray();  
        Arrays.sort(charArray);  // 转化为数组排序是为了方便减枝  
        dfs(charArray, list, visited, new StringBuilder());  

        String[] res = new String[list.size()]; // list转换为数组  
        for(int i = 0; i < res.length; i++){  
            res[i] = list.get(i);  
        }  
        return res;  
    }  

    public void dfs(char[] str, List<String> list, int[] visited, StringBuilder sb){  
        // 当路径长度等于数组长度时，添加该路径  
        if(sb.length() == str.length){  
            list.add(sb.toString());  
            return;  
        }  

        for(int i = 0; i < str.length; i++){  
            // 若已访问，则进入下一次循环  
            if(visited[i] == 1)  
                continue;  
            // 减枝，排序后相等元素不进入递归结构  
            if(i > 0 && str[i] == str[i-1] && visited[i-1] == 1)  
                continue;  
            visited[i] = 1;  // 设置状态变量为1  
            sb.append(str[i]);  
            dfs(str, list, visited, sb);  
            visited[i] = 0;  // 回退，状态变量为0  
            sb.deleteCharAt(sb.length()-1);  // 回退，删除最后一个元素  
        }  
    }  
}  
```  
### 45. 二叉树中和为某一值的路径  
输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。  
**方法：回溯法**  
使用回溯法遍历二叉树的每一条路径，重点是路径添加的判断条件：当sum的值为0且当前为叶子结点，则添加该路径。  
```java  
class Solution {  
    public List<List<Integer>> pathSum(TreeNode root, int sum) {  
        List<List<Integer>> res = new ArrayList<>();  // 路径集合  

        dfs(root, res, new ArrayList<Integer>(), sum);  

        return res;  
    }  

    public void dfs(TreeNode root, List<List<Integer>> res, ArrayList<Integer> path, int sum){  
        // 递归终止条件  
        if(root == null){  
            return;  
        }  

        // 添加当前结点，更新sum值  
        path.add(root.val);        
        sum = sum - root.val;  
        // 当sum值为0且为叶子结点时，添加该路径  
        if(sum == 0 && root.left == null && root.right == null){  
            res.add(new ArrayList<>(path));  // 拷贝一份路径添加到res  
        }  
        else{  
            // 继续递归调用  
            dfs(root.left, res, path, sum);  
            dfs(root.right, res, path, sum);  
        }  
        // 回溯，移除路径尾端值  
        path.remove(path.size()-1);  
    }  
}  
```  
### 46. 机器人的运动范围  
地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。  
例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？  
**方法：深度优先遍历**  
机器人能向四个方向移动，所以直接将4个dfs相加得到最终结果，递归的终止条件根据题意如下：  
```java  
class Solution {  
    int count = 0;  
    public int movingCount(int m, int n, int k) {  
        boolean[][] visited = new boolean[m][n];  
        return dfs(visited, 0, 0, m, n, k);  
    }  

    public int dfs(boolean[][] visited, int i, int j, int m, int n, int k){  
        // 递归终止条件，其中注意与k进行比较的用法  
        if(i < 0 || i >= m || j < 0 || j >= n || (i/10 + i%10 + j/10 + j%10) > k || visited[i][j]){  
            return 0;  
        }  
        visited[i][j] = true;  
        // 向四个方向移动  
        return dfs(visited, i+1, j, m, n, k) + dfs(visited, i-1, j, m, n, k) +  
               dfs(visited, i, j+1, m, n, k) + dfs(visited, i, j-1, m, n, k) + 1;  
    }  
}  
```  

