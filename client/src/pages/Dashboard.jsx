import AdminLayout from "../layouts/AdminLayout";

function Dashboard() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Forms Dashboard
        </h1>

        <p className="text-slate-500">
          Manage your forms and responses.
        </p>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
