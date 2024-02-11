const cardStyles = {
    card: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        margin: "20px",
        maxWidth: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
    },
    interestsItem: {
        fontSize: "14px",
        marginBottom: "5px",
        color: "#555",
    },
    link: {
        textDecoration: "none",
        color: "#007BFF",
        padding: "8px",
        borderRadius: "4px",
        backgroundColor: "#f8f9fa",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 10px",
        border: "1px solid #007BFF",
        transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
    },
};

const Card = ({ name, description, socials, interests,alias }) => {
    return (
        <div style={cardStyles.card}>
            <h2>{name}</h2>
            <p>{alias}</p>
            <p>{description}</p>
            <h3 style={cardStyles.interestsItem}>Interests</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {interests.map((interest, index) => (
                    <li style={cardStyles.interestsItem} key={index}>
                        {interest}
                    </li>
                ))}
            </ul>
            <div>
                {socials.map((social, index) => (
                    <a
                        style={cardStyles.link}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                    >
                        <i
                            className={`fab fa-${social.media}`}
                            style={{ marginRight: "5px" }}
                        ></i>
                        {social.media}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Card;
