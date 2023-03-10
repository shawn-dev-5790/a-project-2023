interface IInput {
  type: string
  name: string
  className: string
  value: any
  hook: any
}
export function Input(inp: IInput) {
  const id = inp.name + inp.value
  const checked = inp.hook.value.includes(inp.value)
  return (
    <>
      <input
        hidden={true}
        type={inp.type}
        id={id}
        name={inp.name}
        value={inp.value}
        checked={checked}
        onChange={inp.hook.onChange}
      />
      <label className={inp.className} htmlFor={id}>
        {inp.value}
      </label>
    </>
  )
}
