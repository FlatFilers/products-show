import ActivityLog from "@/app/(authenticated)/(content)/activity-log/activity-log";
import ResetAccountButton from "@/app/(authenticated)/(content)/activity-log/reset-account-button";

export default async function Page() {
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 text-white">
        <div className="sm:flex sm:items-center">
          <div className="w-full flex flex-row justify-between mb-8">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold">Activity Log</h1>
              <p className="mt-2 text-sm text-gray-400">
                Your activity history from Flatfile will show here.
              </p>
            </div>
            <ResetAccountButton />
          </div>
        </div>
      </div>
      <ActivityLog />
    </div>
  );
}
