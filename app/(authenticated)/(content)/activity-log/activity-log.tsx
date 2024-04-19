import { ActionService } from "@/lib/services/action";
import { DateTime } from "luxon";
import { getServerSession } from "@/lib/get-server-session";
import invariant from "ts-invariant";

export default async function ActivityLog() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");

  const actions = await ActionService.getActions({
    userId: session.user.id,
  });

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="ui-table min-w-full">
              <thead>
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">User</th>
                  <th scope="col">Date</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {actions &&
                  actions.length > 0 &&
                  actions.map((a) => {
                    return (
                      <tr key={a.id}>
                        <td>{a.type}</td>
                        <td className="secondary">{a.user.email}</td>
                        <td>
                          {DateTime.fromISO(
                            a.createdAt.toISOString()
                          ).toLocaleString()}
                        </td>
                        <td>{a.description}</td>
                      </tr>
                    );
                  })}

                {(!actions || actions.length === 0) && (
                  <tr>
                    <td colSpan={4} className="secondary">
                      No actions taken yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
