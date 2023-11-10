export interface TreeDoctype{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	YYY : Data	*/
	title?: string
	/**	ZZZ : Data	*/
	zzz?: string
	/**	Left : Int	*/
	lft?: number
	/**	Right : Int	*/
	rgt?: number
	/**	Is Group : Check	*/
	is_group?: 0 | 1
	/**	Old Parent : Link - Tree Doctype	*/
	old_parent?: string
	/**	Parent Tree Doctype : Link - Tree Doctype	*/
	parent_tree_doctype?: string
}