import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

interface Superhero {
    id: string;
    name: string;
    description: string;
    image: string;
}

const FeedScreen = () => {
    const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchSuperheroes = async () => {
            try {
                const response = await axios.get<Superhero[]>('https://66153746b8b8e32ffc7a49a1.mockapi.io/avengers');
                setSuperheroes(response.data);
            } catch (error) {
                console.error('Error fetching superheroes:', error);
            }
        };

        fetchSuperheroes();
    }, []);

    const handleImagePress = (image: string) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.superheroesContainer}>
                {superheroes.map(superhero => (
                    <TouchableOpacity key={superhero.id} onPress={() => handleImagePress(superhero.image)}>
                        <View style={styles.superheroCard}>
                            <View style={styles.superheroHeader}>
                                <Image source={{ uri: superhero.image }} style={styles.avatar} />
                                <Text style={styles.author}>{superhero.name}</Text>
                            </View>
                            <Image source={{ uri: superhero.image }} style={styles.superheroImage} />
                            <Text style={styles.description}>{superhero.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal visible={!!selectedImage} transparent={true} onRequestClose={handleCloseModal}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: selectedImage }} style={styles.modalImage} />
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    superheroesContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    superheroCard: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        overflow: 'hidden',
    },
    superheroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e8e8e8',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    author: {
        fontWeight: 'bold',
    },
    superheroImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    description: {
        padding: 10,
        fontSize: 16,
        lineHeight: 24,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default FeedScreen;
