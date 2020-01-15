/*
 * Field mapper

 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}

 *
 */
import React, { useState } from "react"

import "./FieldMapper.css"
import DropItem from "../drop-item"
import DragItem from "../drag-item"

const mappings = {
  {{#dataobjects}}
   {{index}}: {
    text: "{{objname}}",
    state: "mapping"
  },
  {{/dataobjects}}

}
function FieldMapper() {
  const [mappingValues, setValue] = useState(mappings)

  return (
    <div className="box">
      <DropItem
        heading="Fields"
        onDrop={id => {
          const currentTodo = { ...mappingValues[id] }
          currentTodo.state = "mapping"
          setValue({ ...mappingValues, ...{ [id]: currentTodo } })
        }}
      >
        {Object.keys(mappingValues)
          .map(key => ({ id: key, ...mappingValues[key] }))
          .filter(mapping => mapping.state === "mapping")
          .map(mapping => (
            <DragItem id={mapping.id} data={mapping} key={mapping.id} />
          ))}
      </DropItem>

      <DropItem
        heading="Transform"
        onDrop={id => {
          const currentTodo = { ...mappingValues[id] }
          currentTodo.state = "wip"
          setValue({ ...mappingValues, ...{ [id]: currentTodo } })
        }}
      >
        {Object.keys(mappingValues)
          .map(key => ({ id: key, ...mappingValues[key] }))
          .filter(mapping => mapping.state === "wip")
          .map(mapping => (
            <DragItem id={mapping.id} data={mapping} key={mapping.id} />
          ))}
      </DropItem>

      <DropItem
        heading="Mapped"
        onDrop={id => {
          const currentTodo = { ...mappingValues[id] }
          currentTodo.state = "done"
          setValue({ ...mappingValues, ...{ [id]: currentTodo } })
        }}
      >
        {Object.keys(mappingValues)
          .map(key => ({ id: key, ...mappingValues[key] }))
          .filter(mapping => mapping.state === "done")
          .map(mapping => (
            <DragItem id={mapping.id} data={mapping} key={mapping.id} />
          ))}
      </DropItem>
    </div>
  )
}

export default FieldMapper
