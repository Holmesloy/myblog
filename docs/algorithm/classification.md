## 排序  
### 1. 冒泡排序  
说明：冒泡排序属于交换排序，在双层循环中实现，每一次内层循环结束，都会将一个数字交换到最终的位置，为了交换的完整性，内层循环从后向左进行比较，以下算法均为从小到大排序。  
```java  
// swap函数  
public static void swap(int[] a, int i, int j){  
    int tmp = a[i];  
    a[i] = a[j];  
    a[j] = tmp;  
}  
// 冒泡排序  
public static void BubbleSort(int[] num){  
    int len = num.length;  
    boolean flag = true;  // 冒泡排序优化，标志位  
    for(int i = 0; i < len && flag; i++){  
        flag = false;  
        for(int j = len-1; j > i; j--){  // j不能等于i，否则j-1会越界  
            if(num[j-1] > num[j]){  
                swap(num, j-1, j);  
                flag = true;  // 若发生交换，则进行下一次循环  
            }  
        }  
        if(!flag){  // 若flag为false，则说明未发生交换，数组已经有序  
            break;  
        }  
    }  
}  
```  
注：冒泡排序算法时间复杂度O(n^2)，属于稳定排序，元素有序的情况较好，最坏全部逆序。  
### 2. 直接插入排序  
说明：插入排序就是将一个记录插入到已经排好序的有序表中，重点在于标记位的使用，进行临时存储数据与判断数组边界。  
思路：从第二位开始排序，将当前待排序的记录使用哨兵保存，若该记录小于前一位记录，则需要在循环中将前面的记录依次向后移动一个位置，直到遇到小于哨兵的记录出现，即为待排序记录的正确位置。  
```java  
public static void InsertSort(int[] num){  
    for(int i = 1; i < num.length; i++){  
        int s = num[i];  
        int j = 0;  
        if(num[i] < num[i-1]){  
            for(j = i - 1; j >= 0 && num[j] > s ; j--){  
                // 使用j+1避免溢出问题  
                num[j+1] = num[j];  
            }  
            num[j+1] = s;  
        }  
    }  
}  
```  
注：直接插入排序时间复杂度O(n^2)，属于稳定排序，性能优于冒泡，元素有序的情况较好，最坏全部逆序。  
### 3. 希尔排序  
说明：直接插入排序的改进，思想是首先设定增量把序列分为几个部分，然后进行直接插入排序，这样序列整体会更加有序,减少位置移动的次数。然后减小增量，继续进行插入排序，直至增量为1，全部元素有序。  
思路：增量初始化为数组长度，然后设置增量依次减少，判断条件如直接插入排序，但是其中要相应计算增量值。  
```java  
public static void ShellSort(int[] nums){  
        int increment = nums.length;  
        int i = 0, j = 0;  
        while(increment > 1){  
            increment = increment / 3 + 1;  
            for(i = increment; i < nums.length; i++){  // 注意是i++  
                int s = nums[i];  // nums[i]  
                if(nums[i] < nums[i-increment]){  
                    // 这里j = i - increment，而不是等于i，如果等于i则nums[j-increment]会有溢出问题  
                    for(j = i - increment; j >= 0 && nums[j] > s; j -= increment){  // nums[j] > s  
                        nums[j+increment] = nums[j];  
                    }  
                    nums[j+increment] = s;  
                }  
            }  
        }  
    }  
```  
时间复杂度：O(n^2)，空间复杂度：O(1)  
属于稳定排序，元素有序的情况较好，最坏全部逆序。  
### 4. 简单选择排序  
说明：简单选择排序是从当前元素开始向后遍历，找到最小的元素与当前元素交换，直到遍历到最后一个元素。  
（1）设定min，存储最小元素下标  
（2）min初始值设为当前元素下标  
（3）遍历后面元素，根据大小改变min数值  
（4）若min发生变化，则交换min指向元素与当前元素  
```java  
public void SelectSort(int[] num){  
        int min = 0;  
        for(int i = 0; i < num.length; i++){  
            min = i;  
            for(int j = i + 1; j < num.length; j++){  
                if(num[j] < num[min]){  
                    min = j;  
                }  
            }  
            if(min != i)  
                swap(num, i, min);  
        }  
    }  
```  
时间复杂度：O(n^2)，空间复杂度：O(1)，属于稳定排序  
### 5. 堆排序  
思想：堆排序是对给定数组构造大根堆（从小到大排序），然后将堆顶元素与最后一个元素依次交换，每交换一次堆长度减1，且将剩余元素继续调整成为一个大根堆，交换到最后就得到一个有序数组，属于选择排序。  
大根堆是一颗完全二叉树，因此大顶堆：**arr[i] >= arr[2*i+1] && arr[i] >= arr[2*i+2]**    
（1）自右向左，自底向上构造大根堆，将较大的元素依次调整上去  
（2）交换第一个元素与最后一个元素，然后除去最后一个元素，将剩余元素调整成为一个大顶堆，再次交换，直至最后一个元素  
```java  
// 堆排序  
public void HeapSort(int[] nums){  
    // 从第一个不是叶子结点的结点开始，右->左，下->上  
    for(int i = nums.length/2 - 1; i >= 0; i--){  
        adjustHeap(nums, i, nums.length);  // 要传入结点位置和数组长度  
    }  
    // 交换元素再调整  
    for(int i = nums.length-1; i > 0; i--){  
        swap(nums, 0, i);  
        adjustHeap(nums, 0, i); // 为什么要传长度？因为此处长度在减小  
    }  
}  
// 调整堆，根据传入的结点位置和长度  
public void adjustHeap(int[] nums, int i, int length){  
    // 保存要调整的结点值  
    int tmp = nums[i];  
    for(int k = i*2 + 1; k < length; k = k * 2 + 1){  
        // 当右结点大于左结点时，k设为右结点  
        if(k + 1 < length && nums[k+1] > nums[k]){  
            k++;  
        }  
        // 如果子结点大于该值，则将子结点调整上去  
        if(nums[k] > tmp){  
            nums[i] = nums[k];  // 注：这里使不使用swap都可以，只要将子结点调整上去，因为i值在tmp中保存着  
            i = k;  // 不要忘记！  
        }  
        else  break;  // 及时跳出，节省时间，不跳出也不会出错      
    }  
    nums[i] = tmp;  // 如果不使用swap要注意将tmp赋值给最终的i位置  
}  
```  
时间复杂度：O(nlogn)，空间复杂度：O(1)，不稳定  

### 6. 快速排序  
思想：快速排序是将待排序序列根据某一基准，将大于该基准的数字移动到基准右边，小于该基准的数字移动到该基准左边。然后再对左边和右边的数字分别进行快速排序，属于递归调用，分治思想。  
（1）选取基准元素：一般选取中间的数或者头尾的数  
（2）选取两个指针，等于begin和end（注意end边界）  
（3）从后向前移动指针，直到找到小于基准元素的值，交换  
（4）从前向后移动指针，直到找到大于基准元素值，交换，完成一趟排序  
（5）分别对基准左边序列和右边序列进行快速排序  
```java  
public static void QuickSort(int[] nums, int begin, int end){  
    // 首先加上判断，作为递归终止条件  
    if(begin < end){  
        int i = begin, j = end;  
        int key = nums[begin];  
        while(i < j){  
            while(i < j && nums[j] > key){  
                j--;  
            }  
            if(i < j){  
                swap(nums, i, j);  
                i++;   // 注意啊啊啊  
            }  
            // 这里i < j  
            while(i < j && nums[i] < key){  
                i++;  
            }  
            if(i < j){  
                swap(nums, i, j);  
                j--;  // 注意啊啊啊  
            }          
        }  
        QuickSort(nums, begin, i-1);  
        QuickSort(nums, i+1, end);  
    }  
}  
```  
优化：三数取中+插排+聚集相等元素，而且在快排过程中不必使用swap()，因为我们只需要保留指针移动到的元素，基准值一直在key中保存，所以直接使用赋值操作，如以下代码：  
```java  
public static void QuickSort(int[] nums, int begin, int end){  
    // 序列较小时，插排比快排效果更好  
    if (high - low + 1 < 10)  
        {  
	        InsertSort(arr,low,high);  
        }  
    else{  
        if(begin < end){  
            int i = begin, j = end;  
            // 三数取中，需另外定义函数  
            int key = SelectMedianOfThree(nums, begin, end) ;  
            while(i < j){  
                while(i < j && nums[j] > key){  
                    j--;  
                }  
                if(i < j){  
                    nums[i] = nums[j];  // 直接赋值  
                    i++;  
                }  
                while(i < j && nums[i] < key){  
                    i++;  
                }  
                if(i < j){  
                    nums[j] = nums[i];  // 直接赋值  
                    j--;  
                }  
                // 一趟排序后key置于最终位置  
                nums[i] = key;  
            }  
            QuickSort(nums, begin, i-1);  
            QuickSort(nums, i+1, end);  
        }  
    }   
}  
```  
最坏时间复杂度（全部逆序）：O(n^2)，平均时间复杂度：O(nlogn)  
不算系统栈空间的话，空间复杂度是O(1)，算的话是O(logn)，不稳定  


### 7. 归并排序  
思想：归并排序采用典型的分治思想，先分：自上而下，将序列从中间分成左右两组，再通过递归分别将两边继续划分，直至一组的元素为2个（或剩余一个），再治：自下而上，将划分好的元素进行排列，复制到原数组中，再向上将更多元素排列，直至整个序列有序。  
（1）划分：使用递归从上至下将序列划分  
（2）合并：相当于合并两个有序数组，使用双指针，新建一个tmp数组存储从小到大的元素（tmp数组在主函数中声明，节省空间），再将tmp数组对应元素拷贝到原数组中  
```java  
public void MergeSort(int[] nums, int left, int right, int[] tmp){  
    // 加上判断，递归终止条件  
    if(left < right){  
        int mid = (left + right) / 2;  // 从中间划分  
        MergeSort(nums, left, mid, tmp);  
        MergeSort(nums, mid+1, right, tmp);  
        Merge(nums, left, right, mid, tmp); // 为什么要传mid，因为mid将序列划分为左右两个部分  
    }  
}  
// 归并  
public void Merge(int[] nums, int left, int right, int mid, int[] tmp){  
    int i = left, j = mid+1, k = 0;  
    while(i <= mid && j <= right){  // 根据mid和right进行判断  
        if(nums[i] > nums[j]){  
            tmp[k++] = nums[j++];  
        }  
        else{  
            tmp[k++] = nums[i++];  
        }  
    }  
    // 指针未到最后的剩余序列直接接在后面  
    while(i <= mid){  
        tmp[k++] = nums[i++];  
    }  
    while(j <= right){  
        tmp[k++] = nums[j++];  
    }  
    // 重要，将tmp已排好序的元素按照位置拷贝到原数组中  
    k = 0;  // 初始化临时变量  
    // 重要，加上判断条件  
    while(left <= right){  // 原数组left到right的值重排  
        nums[left++] = tmp[k++];  
    }  
}  
```  
时间复杂度：O(nlogn), 空间复杂度：O(n)，属于稳定排序  

### 8. 桶排序  


## 链表  

### 1. 反转链表  
定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。  
**方法一：迭代**  
使用辅助结点，遍历链表，反转每个指针指向。  
```java  
/**  
 * Definition for singly-linked list.  
 * public class ListNode {  
 *     int val;  
 *     ListNode next;  
 *     ListNode(int x) { val = x; }  
 * }  
 */  
class Solution {  
    public ListNode reverseList(ListNode head) {  
        if(head == null){  
            return null;  
        }  
        ListNode cur = head;  
        ListNode pre = null;  
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
**方法二：递归**  
从第一个结点head开始看，第二个结点为head.next，如果要反转第一个结点和第二个结点之间的指针，则我们使用`head.next.next = head`让第二个结点指针指向第一个结点，然后设置`head.next=null`，即断开指向第二个结点的指针。这样我们就完成了第一个指针的反转，但是这样带来了一个问题，那就是第三个结点丢失了，发生错误。那么，怎么解决呢？如果我们从最后一个结点开始这样操作，那不就行了。所以我们使用尾递归，就是从尾巴处开始操作，前面的结点依次入栈，然后从最后一个结点开始执行上述操作即可。  
```java  
class Solution {  
    public ListNode reverseList(ListNode head) {  
        // 递归终止条件  
        if(head == null || head.next == null){  
            return head;  
        }  
        // 尾递归，将结点依次入栈  
        ListNode cur = reverseList(head.next);  
        // 从最后一个结点开始，反转指针  
        head.next.next = head;  
        head.next = null;  

        return cur;   
    }  
}  
```  
### 2. 链表中倒数第k个节点  
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。  
**方法：双指针**  
使用快慢指针进行遍历，快指针比慢指针快n个结点，然后快慢指针同时开始前进，当快指针走到链表尾部时，慢指针刚好走到倒数第k个结点，然后注意题目中的定义进行细节调试即可。  
```java  
class Solution {  
    public ListNode getKthFromEnd(ListNode head, int k) {  
        ListNode p = head;  
        while(k > 0){  
            p = p.next;  
            k--;  
        }  
        while(p != null){  
            head = head.next;  
            p = p.next;  
        }  

        return head;  
    }  
}  
```  
### 3. 回文链表  
请判断一个链表是否为回文链表。  
输入: 1->2->2->1  
输出: true  
你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？  
**方法：快慢指针+反转链表+奇偶情况**  
首先使用快慢指针找到链表的中点，在快慢指针遍历的过程中，反转中点前面的链表。  
找到中点后，需要判断中点是奇数中点还是偶数中点，根据快指针fast的值进行判断，然后调整指针。使接下来要遍历的指针置于中点两侧。  
一边向左，一边向右遍历链表并比较数值。最终时间复杂度为O(n)，空间复杂度为O(1)。  
```java  
class Solution {  
    public boolean isPalindrome(ListNode head) {  
        if(head == null)  
            return true;  
        
        ListNode fast = head; // 注意快指针初始指向，画图理解  
        ListNode slow = head;  
        ListNode pre = null;  
        // 找到中点并反转前部链表  
        while(fast != null && fast.next != null){  
            fast = fast.next.next;  
            ListNode next = slow.next;  
            slow.next = pre;  
            pre = slow;  
            slow = next;  
        }  
        // 以上循环后，slow在中点位置，pre在中点前一个位置  
        // 若fast为空表示长度为偶数，否则为奇数  
        if(fast != null){  
            slow = slow.next;  
        }  
        // 遍历比较中点两侧的值  
        while(pre != null){  
            if(pre.val != slow.val)  
                return false;  
            pre = pre.next;  
            slow = slow.next;  
        }  
        
        return true;  
    }  
}  
```  


## DFS(Deep First Search)  

## BFS(Breath First Search)  

## 递归  
递归，即在函数执行过程中，调用自身完成相关操作的过程。  
每次调用到自身时，要记得这时不再执行下一行代码了，要先传入一个新的参数重新执行，相当于跳入一个新的执行栈。当递归执行到最后，通过返回值或者其他表达式得到结果，返回之前的执行栈，然后执行完递归调用的下面代码，再次返回，直至回到第一次执行结束。自顶向下递，自底向上归。  
### 递归的三大要素  
1. 明确函数的功能  
   从宏观上把控函数的功能，不去深入递归过程，明确定义的函数要做什么。比如计算 n 的阶乘等。  
2. 寻找递归终止条件  
   递归在调用函数的过程中，要知道我们传入的参数满足什么条件时，递归结束，然后再返回结果，寻找终止条件。比如当递归到某一项，可以知道这一项结果是什么，则将递归次数就设置为该项。或者如二叉树向下递归，当递归到结点为空时，就返回，结点为空即为递归终止条件。  
3. 缩小问题规模，找出函数的等价关系式  
   根据题目要求找出这一层递归与下一层递归之间的关系，可能是赋值，可能是相减，可能是无返回值只实现相应功能，多多刷题。  


## 二叉树  

### 1. 二叉树的前序遍历  


### 2. 二叉树的中序遍历  


### 3. 二叉树的后序遍历  


### 4. 二叉树的层序遍历  
从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。  
**方法：队列**  
使用队列存储每个结点，然后将出队访问的结点值添加到列表，并将该结点的左右子树依次入队，直至为空。  
```java  
class Solution {  
    public int[] levelOrder(TreeNode root) {  
        if(root == null)  return new int[0];  
        List<Integer> list = new ArrayList<>();  
        // 使用LinkdedList模拟队列操作  
        Queue<TreeNode> queue = new LinkedList<>();  
        queue.add(root);  
        while(!queue.isEmpty()){  
            // remove从头部出来  
            TreeNode node = queue.remove();  
            list.add(node.val);  
            // 将左右子树入队  
            if(node.left != null)  
                queue.add(node.left);  
            if(node.right != null)  
                queue.add(node.right);  
        }  
        // 转换成数组，这样更耗时，可以直接使用数组赋值  
        int[] res = list.stream().mapToInt(Integer::valueOf).toArray();  
        return res;  
    }  
}  
```  

### 5. 二叉树的深度  
**方法：递归**  
求二叉树的深度，就要求左右子树的最大深度，因此遍历左右子树，递归一次深度+1，最终得到结果。  
```java  
class Solution {  
    public int maxDepth(TreeNode root) {  
        if(root == null)  
            return 0;  
        int left = maxDepth(root.left) + 1;  
        int right = maxDepth(root.right) + 1;  
        return Math.max(left, right);  
    }  
}  
```  


### 6. 平衡二叉树  
输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。  
**方法：递归**  
首先，判断根节点是不是平衡的，那么需要判断根结点的左子树的深度和右子树的深度，于是独立出一个求深度的函数。  
当根节点平衡时，递归判断根结点的左子树是否平衡，右子树是否平衡，返回相应结果。  
```java  
class Solution {  
    public boolean isBalanced(TreeNode root) {  
        // root为空表示递归到了底部  
        if(root == null)  return true;  
        if(Math.abs((height(root.left)-height(root.right))) <= 1)  
            return isBalanced(root.left) && isBalanced(root.right);  
        return false;  
    }  
    // 二叉树的深度  
    public int height(TreeNode node){  
        return node == null ? 0 : Math.max(height(node.left), height(node.right)) + 1;  
    }  
}  
```  

### 7. 二叉排序树（查找树、搜索树）  


### 8. 完全二叉树  


### 9. 根据二叉树前序和中序，建立二叉树  
例如：  
前序遍历 preorder = [3,9,20,15,7]  
中序遍历 inorder = [9,3,15,20,7]  
**方法一: 递归**  
从前序遍历中找到树的根以及左右子树的根，然后根据根在中序遍历的索引位置，得到左右子树区间，递归构造二叉树。  
（1）使用HashMap存储中序遍历中的值与对应的索引值  
（2）前序遍历的左边界值即为根，然后找到根在中序遍历中的位置  
（3）递归构建左右子树，找到左右子树的根和对应的区间  
```java  
class Solution {  
    // 使用全局遍历方便传递参数  
    int[] pre;  
    HashMap<Integer, Integer> map = new HashMap<>();  
    public TreeNode buildTree(int[] pre1order, int[] inorder) {  
        if(preorder.length == 0)  
            return null;  
        this.pre = preorder;  // 全局变量赋值  
        for(int i = 0; i < inorder.length; i++){  
            map.put(inorder[i], i);  
        }  
        return helper(0, pre.length-1, 0, inorder.length-1);  
    }  
    // 需要传入的变量为前序的对应左右区间和中序的对应左右区间  
    public TreeNode helper(int pleft, int pright, int ileft, int iright){  
        // 当左区间大于右区间时，返回null  
        if(pleft > pright || ileft > iright)  
            return null;  

        // 从前序中左边界找到根，然后找到其在中序中对应的位置  
        TreeNode root = new TreeNode(pre[pleft]);  
        int p = map.get(root.val);  

        // 递归构造，需要画图理解左右区间取值  
        root.left = helper(pleft+1, pleft+p-ileft, ileft, p-1);  
        root.right = helper(pleft+p-ileft+1, pright, p+1, iright);  
        return root;  
    }  
}  
```  
### 10. 树的子结构  
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)  
B是A的子结构， 即 A中有出现和B相同的结构和节点值。  
例如:  
输入：A = [3,4,5,1,2], B = [4,1]  
输出：true  
**递归**  
B是A的子结构，假设C是A的一颗子树，满足以下条件：  
B的值与C相等，B的左子树值与右子树值跟C的左右子树值对应相等（递归判断）  
那么，C在哪？C从A的根节点开始寻找，如果不是再分别到A的左子树和右子树中寻找，这样又形成了一个递归。  
处理边界条件：  
首先A和B有一个为空树时，返回false  
然后找到B的某一子树为空时，则返回true（说明之前的都满足条件）  
如果找到A的某一字树为空时，则返回false（这时B还没找完，说明不是子结构）  
```java  
/**  
* Binary TreeNode  
public class TreeNode{  
    int val;  
    TreeNode left;  
    TreeNode right;  
    TreeNode(int x){ val = x; }  
}  
*/  
class Solution{  
    public boolean isSubTree(TreeNode A, TreeNode B){  
        if(A == null || B == null)  return false;  
        // 从A开始寻找，判断A和B， 然后再从A的子树寻找，或的关系  
        return helper(A, B) || isSubTree(A.left, B) || isSubTree(A.right, B);  
    }  
    public boolean helper(TreeNode A, TreeNode B){  
        // 注意条件顺序不能错，先判断B是否为空  
        if(B == null)  return true;  
        if(A == null)  return false;  
        // 判断子树是否满足条件  
        return A.val == B.val && helper(A.left, B.left) && helper(A.right, B.right);  
    }  
}  

```  

### 11. 二叉树的镜像  
请完成一个函数，输入一个二叉树，该函数输出它的镜像。  
**方法一：递归**  
首先是递归终止条件：当前结点为空时，返回null  
然后递归过程：根的左子树和右子树进行交换，然后递归左右子树进行该操作  
```java  
class Solution {  
    public TreeNode mirrorTree(TreeNode root) {  
        if(root == null)  return null;  
        // 左右子树交换  
        TreeNode node = root.left;  
        root.left = root.right;  
        root.right = node;  
        
        mirrorTree(root.left);  
        mirrorTree(root.right);  
        return root;  
    }  
}  
```  
**方法二：栈**  
将根节点入栈，当栈不为空时，交换栈顶元素的左右子树，然后入栈的顺序是先右子树后左子树，即可实现二叉树的翻转。  
```java  
class Solution {  
    public TreeNode mirrorTree(TreeNode root) {  
        if(root == null)  return null;  
        Stack<TreeNode> stack = new Stack<>();  
        stack.push(root);  
        while(!stack.isEmpty()){  
            TreeNode node = stack.pop();  
            // 交换左右子树  
            TreeNode tmp = node.left;  
            node.left = node.right;  
            node.right = tmp;  
            // 先右后左  
            if(node.right != null){  
                stack.push(node.right);  
            }  
            if(node.left != null){  
                stack.push(node.left);  
            }  
        }  
        return root;  
    }  
}  
```  

### 12. 对称的二叉树  
请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。  
**方法：递归**  
判断一棵树是否对称，那么首先看根节点的左右子树：  
左右子树都为空，对称  
左右子树有一颗为空，不对称  
左子树和右子树值不相等，不对称  
以上即为递归的终止条件，那么如果左右子树满足了上述条件，接下来就要判断左子树的左孩子和右子树的右孩子，以及左子树的右孩子和右子树的左孩子是否满足上述条件，构成递归。  
```java  
class Solution {  
    public boolean isSymmetric(TreeNode root) {  
        if(root == null)  return true;  
        // 直接传递左右子树进行判断，比较方便  
        return helper(root.left, root.right);  
    }  
    public boolean helper(TreeNode left, TreeNode right){  
        // 判断递归终止条件  
        if(left == null && right == null)  return true;  
        if(left == null || right == null)  return false;  
        if(left.val != right.val)  return false;  
        // 递归调用  
        return helper(left.left, right.right) && helper(left.right, right.left);  
    }  
}  
```  

### 13. 二叉搜索树中的第k大结点  
**方法：遍历存值**  
二叉搜索树的中序遍历是从小到大排序的，中序遍历顺序为左根右，如果从大到小排序，则遍历的顺序则为右根左。所以在一个递归中进行该遍历，要求第k大，则直接使用一个全局遍历存储递归次数，再用一个变量存储结果，当其等于k时，停止遍历，返回结果。  
```java  
class Solution {  
    // 设置全局变量  
    int res = 0, count = 0;  
    public int kthLargest(TreeNode root, int k) {  
        helper(root, k);  
        return res;  
    }  
    使用void声明函数  
    public void helper(TreeNode root, int k){  
        // 单独判断左右子树再递归  
        if(root.right != null)  
            helper(root.right, k);  
        if(++count == k){  
            res = root.val;  
            return;  
        }  
        if(root.left != null)  
            helper(root.left, k);  
    }  
}  
```  
### 14. 二叉搜索树的最近公共祖先  
最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”  
**方法：递归**  
二叉搜索树的每个结点都不相等，对于p、q，有以下三种可能：  
p、q都小于根结点，在左子树  
p、q都大于根节点，在右子树  
p、q一个在左子树，一个在右子树，那么公共祖先为根节点  
```java  
class Solution {  
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {  
        if(root == null)  
            return null;  
        if(p.val > root.val && q.val > root.val)  
            return lowestCommonAncestor(root.right, p, q);  
        if(p.val < root.val && q.val < root.val)  
            return lowestCommonAncestor(root.left, p, q);  
        
        return root;  
    }  
}  
```  
### 15. 二叉树的最近公共祖先  
最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”  
**方法：递归**  
本题中各结点的值都不相等，结果仍然有三种可能：  
p、q都在左子树  
p、q都在右子树  
p、q一左一右  
知道这几种情况该如何形成递归？首先是递归终止条件：当前结点为空时，返回null，另外当p和q有一个跟当前结点值相等时，则返回当前结点。  
然后由上而下递归，分别取左子树、p、q和右子树、p、q递归。递归完成后，当左右两个值都不为空，说明左子树和右子树分别有值与p或者q相等，因此说明p和q分开在左右子树，公共祖先为根结点。然后当左结果不为空时，说明p、q都在左子树中，返回左子树当前结点。当右结果不为空时，说明p、q都在右子树中，返回右子树递归的结点。  
```java  
class Solution {  
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {  
        if(root == null)  
            return null;  
        if(p.val == root.val || q.val == root.val)  
            return root;  
        // 递归左右子树  
        TreeNode left = lowestCommonAncestor(root.left, p, q);  
        TreeNode right = lowestCommonAncestor(root.right, p, q);  
        // 说明p、q分列在左右子树，返回根结点  
        if(left != null && right != null)  
            return root;  
        // left不空，返回左子树递归的结点+  
        if(left != null){  
            return left;  
        }  
        // right不空，返回右子树递归的结点  
        if(right != null){  
            return right;  
        }  
        // 否则返回空  
        return null;  
    }  
}  
```  









## 动态规划  