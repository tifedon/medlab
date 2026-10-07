import Image from 'next/image';

const team = [
  { name: 'Ammar', role: 'Software Developer', color: '#f26d5b' },
  { name: 'Alec', role: 'Software Developer', color: '#f5a6b0' },
  { name: 'Brenda', role: 'Graphic Designer', color: '#eacc37' },
  { name: 'Bronwen', role: 'Instructional Designer\nMultimedia Content Specialist', color: '#97d643' },
  { name: 'Clayton', role: 'Instructional Designer\nMultimedia Content Specialist', color: '#1eb4c6' },
  { name: 'Dan', role: 'Instructional Designer', color: '#f79a29' },
  { name: 'Elena', role: 'Content Creator', color: '#f26d5b' },
  { name: 'Felix', role: 'UX Researcher', color: '#f5a6b0' },
  { name: 'Grace', role: 'Product Manager', color: '#eacc37' },
  { name: 'Henry', role: 'Frontend Developer', color: '#97d643' },
  { name: 'Isla', role: 'Backend Developer', color: '#1eb4c6' },
  { name: 'Jack', role: 'DevOps Engineer', color: '#f79a29' },
  { name: 'Karen', role: 'QA Tester', color: '#f26d5b' },
  { name: 'Leo', role: 'Data Analyst', color: '#f5a6b0' },
  { name: 'Mia', role: 'Marketing Specialist', color: '#eacc37' },
  { name: 'Noah', role: 'Copywriter', color: '#97d643' },
  { name: 'Olivia', role: 'SEO Specialist', color: '#1eb4c6' },
  { name: 'Paul', role: 'Customer Support', color: '#f79a29' },
  { name: 'Quinn', role: 'Sales Rep', color: '#f26d5b' },
  { name: 'Rachel', role: 'HR Manager', color: '#f5a6b0' },
];

export default function MeetTheTeam() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '4rem', width: '100%' }}>
      <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
        <Image 
          src="/images/team_banner.png" 
          alt="Team Banner" 
          width={1200} 
          height={400} 
          style={{ width: '100%', maxWidth: '1200px', height: 'auto', display: 'block' }} 
        />
      </div>
      
      <div style={{ maxWidth: '800px', margin: '3rem auto 4rem auto', padding: '0 1.5rem' }}>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-700)' }}>
          We are a small but dedicated team of content creators, designers, and developers. We bring a mix of unique skills to the table that allows us to produce quality educational content to our users every day — and we have fun doing it!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {team.map((member, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: member.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              padding: '12px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </div>
            </div>
            <h3 style={{ 
              color: '#1eb4c6', 
              fontSize: '1.35rem', 
              fontWeight: 700, 
              marginBottom: '0.5rem' 
            }}>
              {member.name}
            </h3>
            <p style={{ 
              color: 'var(--navy-500)', 
              fontSize: '1rem', 
              whiteSpace: 'pre-line',
              lineHeight: 1.5,
              margin: 0
            }}>
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
