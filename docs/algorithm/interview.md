## 题目
### 1. 反转链表
题目描述：输入一个链表，反转链表后，输出新链表。  
思路：可以使用指针实现，也可以使用辅助栈实现，以下使用指针进行实现。使用三个辅助指针，cur，pre和next，cur表示当前结点，在循环中将指针转向，最后输出头指针。  
java实现：
```java
/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/
public class Solution {
    public ListNode ReverseList(ListNode head) {
        if(head == null){
            return null;
        }
        ListNode pre = null;  
        ListNode cur = head;
        ListNode next = null;
        while(cur != null){
            // 改变指针转向
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        return pre;
    }
}
```
### 2. 二分查找
题目描述：实现有重复数字的有序数组的二分查找。输出在数组中第一个大于等于查找值的位置，如果数组中不存在这样的数，则输出数组长度加一。  
思路：二分查找中心思想是需要确定左右边界，然后在左边界小于右边界的循环中对数组进行折半处理，确定区间内的操作。  
java实现:
```java
public class Solution {
    /**
     * 二分查找
     * @param n int整型 数组长度
     * @param v int整型 查找值
     * @param a int整型一维数组 有序数组
     * @return int整型
     */
    public int upper_bound_ (int n, int v, int[] a) {
        // write code here
        int left = 0, right = n - 1;  // 初始化左右边界
        while(left < right){   // 循环
            int mid = left + (right - left) / 2;
            if(v <= a[mid]){  // 左半边界处理
                if(mid == 0 || v > a[mid-1])
                    return mid + 1;
                else
                    right = mid;
            }
            else{
                left = mid + 1;
            }
        }
        return n + 1;
    }
}
```
### 3. 判断链表是否有环
题目描述：判断给定的链表中是否有环  
思路：利用快慢指针，快的指针一次前进两步，慢指针一次前进一步，若链表有环，则快指针必追上慢指针。  
java实现：  
```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode f = head;
        ListNode s = head;
        while(f != null && f.next != null){  // 都以快指针进行判断
            s = s.next;
            f = f.next.next;
            if(f == s)
                return true;
        }
        return false;
    }
}
```
### 4. 实现二叉树先序、中序、后序遍历
题目描述：分别按照二叉树先序，中序和后序打印所有的节点。  
思路：使用List集合存储结点，经过遍历后将List集合转换为数组输出  
java实现：
```java
public class Solution {
    /**
     * 
     * @param root TreeNode类 the root of binary tree
     * @return int整型二维数组
     */
    private static ArrayList<Integer> preNode = new ArrayList<>();
    private static ArrayList<Integer> midNode = new ArrayList<>();
    private static ArrayList<Integer> postNode = new ArrayList<>();
    public int[][] threeOrders (TreeNode root) {
        // write code here
        preOrder(root);
        midOrder(root);
        postOrder(root);
        int[][] order = new int[3][];  // 二维数组的声明
        order[0] = toIntArray(preNode);
        order[1] = toIntArray(midNode);
        order[2] = toIntArray(postNode);
        return order;
    }
    // List集合转换为数组
    public static int[] toIntArray(ArrayList<Integer> arrayList){
        int[] intArray = arrayList.stream().mapToInt(Integer::valueOf).toArray();
        return intArray;
    }
    public static void preOrder(TreeNode root){
        if(root != null){
            preNode.add(root.val);
            preOrder(root.left);
            preOrder(root.right);
        }
    }
    public static void midOrder(TreeNode root){
        if(root != null){
            midOrder(root.left);
            midNode.add(root.val);
            midOrder(root.right);
        }
    }
    public static void postOrder(TreeNode root){
        if(root != null){
            postOrder(root.left);
            postOrder(root.right);
            postNode.add(root.val);
        }
    }
}
```
### 5. 删除链表的倒数第n个结点
题目描述：给定一个链表，删除链表的倒数第n个节点并返回链表的头指针  
思路：使用快慢指针，快指针比慢指针快n个结点，则当快指针移动到链表末尾时，慢指针指向的结点即为要删除的结点，注意边界条件的判断。  
java实现：
```java
public class Solution {
    /**
     * @param head ListNode类 
     * @param n int整型 
     * @return ListNode类
     */
    public ListNode removeNthFromEnd (ListNode head, int n) {
        // write code here
        ListNode slow = head;
        ListNode fast = head;
        ListNode pre = null;
        while(n != 0){
            fast = fast.next;  // 快指针
            n--;
        }
        if(fast == null){  // 快指针边界，删除第一个结点
            head = head.next;
            return head;
        }
        while(fast.next != null){  // 注意使用next和不使用next的区别
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return head;
    }
}
```
### 6. 合并有序列表
题目描述：将两个有序的链表合并为一个新链表，要求新的链表是通过拼接两个链表的节点来生成的。  
思路：首先取两个有序链表第一个数较小的那个作为头结点，然后在两个链表均不为空时进入循环判断两个链表值，头结点下一个结点指向其中较小的结点，依次拼接，最后直接拼接不为空的那个链表。  
java实现：
```java
public class Solution {
    /**
     * 
     * @param l1 ListNode类 
     * @param l2 ListNode类 
     * @return ListNode类
     */
public static ListNode mergeTwoLists (ListNode l1, ListNode l2) {
    // 首先处理链表为空的情况
    if(l1 == null){
        return l2;
    }
    if(l2 == null){
        return l1;
    }
    ListNode l = (l1.val <= l2.val)? l1 : l2; // 取较小结点为头结点
    ListNode l3 = l; // 头指针
    l1 = (l == l1)? l1.next : l1; // 处理l1
    l2 = (l == l2)? l2.next : l2;
    while(l1 != null && l2 != null){
        if(l1.val <= l2.val){
            l.next = l1;  // 拼接结点
            l1 = l1.next;
        }
        else{
            l.next = l2;
            l2 = l2.next;
        }
        l = l.next;  // 指针后移
    }
    l.next = (l1 == null)? l2 : l1;  // 拼接未空的结点
    // 时间复杂度O(m + n)，空间复杂度O(1)
    return l3;
}
}
```
