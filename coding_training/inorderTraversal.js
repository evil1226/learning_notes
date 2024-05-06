function inorderTraversal(root){
    const res=[]
    const inorder=(root)=>{
        if(!root){
            return 
        }
        inorder(root.left)
        res.push(root)
        inorder(root.right)
    }
    inorder(root)
    return res
}