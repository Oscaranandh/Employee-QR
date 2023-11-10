export interface testdoctype{
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
	/**	Title : Data	*/
	title?: string
	/**	name  : Data	*/
	name1?: string
	/**	id : Int	*/
	id1?: number
}