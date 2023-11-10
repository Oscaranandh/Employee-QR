export interface Normaldoctype{
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
	/**	ABC : Data	*/
	title?: string
	/**	DEF : Data	*/
	def?: string
	/**	ImageList : Long Text	*/
	imagelist?: string
}