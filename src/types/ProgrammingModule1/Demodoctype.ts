export interface Demodoctype{
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
	/**	First Name : Data	*/
	first_name?: string
	/**	Last Name : Data	*/
	last_name?: string
	/**	Image : Attach Image	*/
	image?: string
	/**	barcode : Barcode	*/
	bar_code?: any
	/**	checkbox : Check	*/
	checkbox?: 0 | 1
	/**	color : Color	*/
	color?: string
	/**	currency : Currency	*/
	currency?: number
	/**	date : Date	*/
	date?: string
	/**	datetime : Datetime	*/
	datetime?: string
	/**	link : Link - Employee	*/
	link?: string
	/**	select : Select	*/
	select?: "Breakfast" | "Lunch" | "Dinner"
}