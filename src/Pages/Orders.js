import React from "react";

const ApplicationsTable = () => {
  return (
    <>
      <div className="card shadow border-0 mb-7">
        <div className="card-header">
          <h5 className="mb-0">Orders</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-nowrap">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Company</th>
                <th scope="col">Offer</th>
                <th scope="col">Meeting</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    className="avatar avatar-sm rounded-circle me-2"
                  />
                  <p>Robert Fox</p>
                </td>
                <td>Feb 15, 2021</td>
                <td className="d-flex align-middle">
                  <img
                    alt="..."
                    src="https://preview.webpixels.io/web/img/other/logos/logo-1.png"
                    className="avatar avatar-xs rounded-circle me-2"
                  />
                  <p>Dribbble</p>
                </td>
                <td>$3.500</td>
                <td>
                  <span className="badge badge-lg badge-dot">
                    <i className="bg-success"></i>Scheduled
                  </span>
                </td>
                <td className="text-end">
                  <p className="btn btn-sm btn-neutral">View</p>
                  <button
                    type="button"
                    className="btn btn-sm btn-square btn-neutral text-danger-hover"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              {/* More table rows can be added here */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApplicationsTable;
