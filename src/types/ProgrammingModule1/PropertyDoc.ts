import { linksofpics } from './linksofpics'

export interface PropertyDoc{
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
	/**	imagelist : Long Text	*/
	imagelist?: string
	/**	onemore : Table - links of pics	*/
	onemore?: linksofpics[]
}