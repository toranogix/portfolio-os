import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.header}>
        <span className={styles.avatar}>👤</span>
        <div>
          <h1 className={styles.name}>Cheick Oumar DIALLO</h1>
          <p className={styles.role}>GIS Consultant / Developer (i think so ...) / Curious guy :)</p>
        </div>
      </div>

      <hr className={styles.hr} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p>
          Welcome to my portfolio! 
           I'm <strong> Cheick Oumar DIALLO</strong> and i work as a GIS Consultant. 
           I'm a passionate about GIS (Maps on top !) and programming and I'm always looking for new challenges and opportunities to learn and grow.
          <br /> Enjoy your stay!
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <h4 className={styles.sectionSubtitle}>Programming</h4>
          <ul className={styles.skills}>
            {['Python', 'React', 'React Native', 'JavaScript', 'TypeScript', 'Three.js', 'Node.js',
            'SQL', 'PostgreSQL', 'Git', 'GitHub', 'Microsoft Azure DevOps', 'GCP'].map((s) => (
                <li key={s} className={styles.skill}>{s}</li>
              ))}
            </ul>
        <br />
        <h4 className={styles.sectionSubtitle}>GIS</h4>
        <ul className={styles.skills}>
          {['ArcGIS Pro', 'ArcGIS Online', 'ArcGIS Enterprise', 'ArcGIS API for JavaScript', 'Arcpy',
            'PostGIS', 'QGIS', 'LizMap', 'MapBox', 'GeoServer'
          ].map((s) => (
              <li key={s} className={styles.skill}>{s}</li>
            ))}
          </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Links</h2>
        <div className={styles.links}>
          <a href="https://github.com/toranogix/" className={styles.link}>GitHub</a>
          <a href="#" className={styles.link}>LinkedIn</a>
          <a href="#" className={styles.link}>Portfolio</a>
        </div>
      </section>
    </div>
  )
}
