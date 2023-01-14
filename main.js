const TreeNode = (data, left = null, right = null) => {
	return { data, left, right };
};

const Tree = (values) => {
	let root = buildTree(values);

	function buildTree(values, isSorted = false, isUnique = false) {
		if (!isSorted) {
			values.sort((a, b) => a - b);
		}

		if (!isUnique) {
			values = [...new Set(values)];
		}

		const build = (sorted) => {
			const len = sorted.length;
			if (len === 0) {
				return null;
			}

			if (len === 1) {
				return TreeNode(sorted[0]);
			}

			const mid = Math.floor(len / 2);
			const leftArr = sorted.slice(0, mid);
			const rightArr = sorted.slice(mid + 1);

			const left = build(leftArr);
			const right = build(rightArr);
			return TreeNode(sorted[mid], left, right);
		};

		return build(values);
	}

	function insert(data) {
		if (!this.root) {
			this.root = TreeNode(data);
			return;
		}

		const traverse = (node) => {
			if (!node.left && !node.right) {
				return node;
			}

			if (node.data > data) {
				if (!node.left) {
					return node;
				}

				return traverse(node.left);
			}

			if (!node.right) {
				return node;
			}

			return traverse(node.right);
		};

		const parent = traverse(this.root);
		if (data < parent.data) {
			parent.left = TreeNode(data);
		} else if (data > parent.data) {
			parent.right = TreeNode(data);
		}
	}

	function _delete(data) {
		deleteRec(this.root, data);
	}

	function deleteRec(node, data) {
		if (node == null) {
			return node;
		}

		if (data < node.data) {
			node.left = deleteRec(node.left, data);
		} else if (data > node.data) {
			node.right = deleteRec(node.right, data);
		} else {
			if (node.left == null) {
				return node.right;
			} else if (node.right == null) {
				return node.left;
			}

			node.data = minVal(node.right);

			node.right = deleteRec(node.right, node.data);
		}

		return node;
	}

	function minVal(node) {
		let min = node.data;
		while (node.left != null) {
			min = node.left.data;
			node = node.left;
		}

		return min;
	}

	function find(data) {
		return findRec(this.root, data);
	}

	function findRec(node, data) {
		if (!node || node.data === data) {
			return node;
		}

		if (node.data > data) {
			return findRec(node.left, data);
		}

		return findRec(node.right, data);
	}

	function levelOrder(func) {
		if (!this.root) {
			return;
		}

		const q = [];
		q.push(this.root);

		while (q.length) {
			const len = q.length;
			for (let i = 0; i < len; i += 1) {
				let node = q.shift();
				if (node.left) {
					q.push(node.left);
				}

				if (node.right) {
					q.push(node.right);
				}

				func(node);
			}
		}
	}

	function inOrder(func) {
		const nodes = inOrderRec(this.root);

		if (!func) {
			return nodes;
		}

		nodes.forEach((node) => {
			func(node);
		});
	}

	function inOrderRec(node) {
		if (!node) {
			return [];
		}

		const left = inOrderRec(node.left);
		const right = inOrderRec(node.right);
		return [...left, node, ...right];
	}

	function preOrder(func) {
		const nodes = preOrderRec(this.root);

		if (!func) {
			return nodes;
		}

		nodes.forEach((node) => {
			func(node);
		});
	}

	function preOrderRec(node) {
		if (!node) {
			return [];
		}

		const left = preOrderRec(node.left);
		const right = preOrderRec(node.right);
		return [node, ...left, ...right];
	}

	function postOrder(func) {
		const nodes = postOrderRec(this.root);

		if (!func) {
			return nodes;
		}

		nodes.forEach((node) => {
			func(node);
		});
	}

	function postOrderRec(node) {
		if (!node) {
			return [];
		}

		const left = postOrderRec(node.left);
		const right = postOrderRec(node.right);
		return [...left, ...right, node];
	}

	function height() {
		return heightRec(this.root);
	}

	function heightRec(node) {
		if (!node || (!node.right && !node.left)) {
			return 0;
		}

		const left = heightRec(node.left);
		const right = heightRec(node.right);
		return 1 + Math.max(left, right);
	}

	function depth(node) {
		return depthRec(this.root, node);
	}

	function depthRec(node, search) {
		if (!node) {
			return false;
		}

		if (node.data === search.data) {
			return 0;
		}

		let result;
		if (node.data < search.data) {
			result = depthRec(node.right, search);
		} else {
			result = depthRec(node.left, search);
		}

		return result !== false && result + 1;
	}

	function isBalanced() {
		return isBalancedRec(this.root);
	}

	function isBalancedRec(node) {
		// would use memoization to avoid redundant height calc
		if (!node) {
			return true;
		}

		const hLeft = heightRec(node.left);
		const hRight = heightRec(node.right);
		return (
			Math.abs(hLeft - hRight) <= 1 &&
			isBalanced(node.left) &&
			isBalanced(node.right)
		);
	}

	function rebalance() {
		const nodes = inOrderRec(this.root).map((node) => node.data);
		this.root = buildTree(nodes, true, true);
	}

	return {
		root,
		insert,
		delete: _delete,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		height,
		depth,
		isBalanced,
		rebalance,
	};
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};
const randArr = () => {
	let res = [];
	for (let i = 0; i < 10; i += 1) {
		res.push(Math.floor(Math.random() * 99));
	}
	return res;
};
const bst = Tree(randArr());
prettyPrint(bst.root);
console.log(`Is tree balanced? ${bst.isBalanced()}`);
console.log("LEVEL ORDER:");
bst.levelOrder((node) => console.log(node.data));
console.log("-----------");
console.log("PRE ORDER:");
bst.preOrder((node) => console.log(node.data));
console.log("-----------");
console.log("POST ORDER:");
bst.postOrder((node) => console.log(node.data));
console.log("-----------");
console.log("IN ORDER:");
bst.inOrder((node) => console.log(node.data));
console.log("-----------");
bst.insert(120);
bst.insert(130);
bst.insert(140);
bst.insert(150);
console.log(`Is tree balanced? ${bst.isBalanced()}`);
prettyPrint(bst.root);
bst.rebalance();
console.log(`Is tree balanced? ${bst.isBalanced()}`);
prettyPrint(bst.root);
console.log("LEVEL ORDER:");
bst.levelOrder((node) => console.log(node.data));
console.log("-----------");
console.log("PRE ORDER:");
bst.preOrder((node) => console.log(node.data));
console.log("-----------");
console.log("POST ORDER:");
bst.postOrder((node) => console.log(node.data));
console.log("-----------");
console.log("IN ORDER:");
bst.inOrder((node) => console.log(node.data));
console.log("-----------");
