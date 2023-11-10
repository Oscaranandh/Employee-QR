export interface EmployeeExit{
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
	/**	Employee Name  : Data	*/
	employee_name?: string
	/**	Employee ID : Data	*/
	employee_id?: string
	/**	Out Time : Data	*/
	out_time?: string
	/**	Location : Data	*/
	location?: string
}