const Variants = () => {
  return (
    <div>
      <h6>Variants</h6>
      <table className="table rs-shadow-1 rs-border-radius-sm rs-border is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Percent</th>
            <th>Created</th>
            <th>Last Modified</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Treatment Variant</td>
            <td>50%</td>
            <td>01/20/2021</td>
            <td>01/20/2021</td>
            <td>
              <span class="icon">
                <i class="fas fa-ellipsis-v"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Control Variant</td>
            <td>50%</td>
            <td>01/20/2021</td>
            <td>01/20/2021</td>
            <td>
              <span class="icon">
                <i class="fas fa-ellipsis-v"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>+ Add Variant</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


const VariantEditorModal = () => {
  return (
    <div>
      VariantEditorModal
    </div>
  )
}

export default Variants;