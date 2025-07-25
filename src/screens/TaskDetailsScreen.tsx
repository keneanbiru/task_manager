import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { toggleTaskCompletion, Task, deleteTask } from '../store/tasksSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Type for navigation props
 type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const dispatch = useAppDispatch();
  const task = useAppSelector(state => state.tasks.tasks.find((t: Task) => t.id === taskId));

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 16 }}>Task not found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <LinearGradient
            colors={["#FF69B4", "#F5E6DA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  const handleToggle = () => {
    dispatch(toggleTaskCompletion(task.id));
    Alert.alert('Status Updated', `Task marked as ${task.completed ? 'incomplete' : 'completed'}.`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteTask(task.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#F5E6DA", "#FFEBEE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.label}>Title</Text>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {task.completed ? (
            <Feather name="check-circle" size={22} color="#FF69B4" style={{ marginRight: 8 }} />
          ) : (
            <Feather name="clock" size={22} color="#3E2723" style={{ marginRight: 8 }} />
          )}
          <Text style={[styles.status, task.completed ? styles.completed : styles.incomplete]}>
            {task.completed ? 'Completed' : 'Incomplete'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { shadowColor: '#FF69B4' }]}
          onPress={handleToggle}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#FF69B4", "#F5E6DA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginTop: 10, shadowColor: '#3E2723' }]} onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <LinearGradient
            colors={["#3E2723", "#F5E6DA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={[styles.buttonText, { color: '#F5E6DA' }]}>Back to List</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.85}>
          <LinearGradient
            colors={["#3E2723", "#FF69B4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.deleteButtonGradient}
          >
            <View style={styles.deleteButtonContent}>
              <MaterialIcons name="delete" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6DA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 22,
    padding: 32,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  
  },
  divider: {
    height: 1.5,
    backgroundColor: '#F5E6DA',
    marginVertical: 18,
    borderRadius: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5E6DA',
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: '#3E2723',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    color: '#3E2723',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  completed: {
    color: '#3E2723',
  },
  incomplete: {
    color: '#FF69B4',
  },
  button: {
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    width: 220,
    marginTop: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
    textShadowColor: '#FF1493',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  deleteButton: {
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    width: 220,
    marginTop: 32,
    shadowColor: '#3E2723',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 36,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  deleteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
    textShadowColor: '#3E2723',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default TaskDetailsScreen; 