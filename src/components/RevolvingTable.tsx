export function RevolvingTable() {
  return (
    <div className="table-stage" aria-hidden="true">
      <div className="table-spin">
        <div className="table-top" />
        <div className="table-edge" />
        <div className="table-leg table-leg-1" />
        <div className="table-leg table-leg-2" />
        <div className="table-leg table-leg-3" />
        <div className="table-leg table-leg-4" />
        <div className="table-floor" />
      </div>
    </div>
  );
}
