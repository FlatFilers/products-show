export enum ActionType {
  SyncRecords = "sync-records",
  FileFeedEvent = "file-feed-event",
  SyncFileFeedRecords = "sync-filefeed-records",
  SyncOnboardingRecords = "sync-onboarding-records",
  SyncEmbedRecords = "sync-embed-records",
  SyncFilefeedRecords = "sync-filefeed-records",
  SyncDynamicRecords = "sync-dynamic-records",
}

export type FilefeedEvent = {
  topic: string;
  when: string;
};
