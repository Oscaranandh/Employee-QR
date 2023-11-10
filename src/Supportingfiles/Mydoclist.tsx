import { useFrappeGetDocList } from "frappe-react-sdk";

export const MyDocumentList = (localStorage: any, doctype: any) => {
  const { data, error, isValidating } = useFrappeGetDocList(doctype, {
    /** Fields to be fetched - Optional */
    fields: ["status", "id"],
    /** Filters to be applied - SQL AND operation */
    filters: [["id", "=", JSON.parse(localStorage.formdata)["id"]]],
    
    
    orderBy: {
      field: "creation",
      order: "desc",
      // },
      // /** Fetch documents as a dictionary */
      // asDict: false,
    },
    // {
    //   /** SWR Configuration Options - Optional **/
    // }
  });

  if (isValidating) {
    return <>Loading</>;
  }
  if (error) {
    return "errors";
  }
  if (data) {
    return (
      // <p>
      //   {JSON.stringify(data)}
      //   <button onClick={() => mutate()}>Reload</button>
      // </p>
      data
    );
  }
  return null;
};