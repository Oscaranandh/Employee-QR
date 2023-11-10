import { imagelinks } from './imagelinks'

export interface NewDoctypefromOld{
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
	/**	Workflow State : Link - Workflow State	*/
	workflow_state?: string
	/**	Location : Data	*/
	location?: string
	/**	Time : Data	*/
	time?: string
	/**	Image : Attach Image	*/
	image?: string
	/**	Carry : Data	*/
	carry?: string
	/**	date : Data	*/
	date?: string
	/**	ImageList6 : Long Text	*/
	imagelist6?: string
	/**	Laptop Serial : Data	*/
	laptop_serial?: string
	/**	Laptop Brand : Data	*/
	laptop_brand?: string
	/**	id : Data	*/
	id?: string
	/**	Return : Data	*/
	checked?: string
	/**	Balance : Data	*/
	unchecked?: string
	/**	status : Data	*/
	status?: string
	/**	Imagelinks : Table - imagelinks	*/
	imagelinks?: imagelinks[]
	/**	Employee Doctype : Link - Employee	*/
	employee_doctype?: string
	/**	Attendance Doctype : Link - Attendance	*/
	attendance_doctype?: string
	/**	Amended From : Link - NewDoctypefromOld	*/
	amended_from?: string
	/**	LaptopImage1 : Attach Image	*/
	laptopimage1?: string
	/**	LaptopImage2 : Attach Image	*/
	laptopimage2?: string
	/**	LaptopImage3 : Attach Image	*/
	laptopimage3?: string
	/**	LaptopImage4 : Attach Image	*/
	laptopimage4?: string
	/**	Laptop Status : Data	*/
	laptop_status?: string
}