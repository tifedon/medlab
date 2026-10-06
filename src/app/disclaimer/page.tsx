import type { Metadata } from 'next';
import PolicyPage from '@/components/PolicyPage';
import { MEDICAL_DISCLAIMER } from '@/lib/site';

export const metadata: Metadata = { title: 'Medical disclaimer', description: MEDICAL_DISCLAIMER, alternates: { canonical: '/disclaimer' } };

export default function DisclaimerPage() {
  return (
    <PolicyPage title="Medical disclaimer" lead={MEDICAL_DISCLAIMER} updated="October 2026">
      <h2>Education, not advice</h2>
      <p>Articles, summaries, course material and illustrations on this website explain research and clinical science in general terms. They do not take account of any individual’s circumstances and must not be used to diagnose or treat anyone.</p>
      <h2>Evidence changes</h2>
      <p>Medical evidence and guidelines change. Clinical material carries publication or review dates; check that you are using current guidance from a qualified professional or an official guideline body.</p>
      <h2>Registered studies</h2>
      <p>Studies in the research watch are listed for information. Sterling IMRES does not run them and cannot enrol anyone. Contact the study team named on the registry record.</p>
      <h2>In an emergency</h2>
      <p>If you or someone else needs urgent medical help, contact your local emergency services.</p>
    </PolicyPage>
  );
}
