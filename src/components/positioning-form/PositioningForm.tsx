import React from 'react';
import styles from './PositioningForm.module.css';

const PositioningForm: React.FC = () => {
    return (
        <div className={styles.form}>
            <h3 className={styles.title}>Позиционирование</h3>

            <div className={styles.block}>
                <label className={styles.label}>Категории</label>
                <div className={styles.tags}>
                    <div className={styles.tag}>
                        <span>интерактивное</span>
                        <button className={styles.remove}>X</button>
                    </div>
                    <div className={styles.tag}>
                        <span>IT</span>
                        <button className={styles.remove}>X</button>
                    </div>
                    <div className={styles.tag}>
                        <span>внеучебное</span>
                        <button className={styles.remove}>X</button>
                    </div>
                    <div className={styles.tag}>
                        <span>научно-познавательное</span>
                        <button className={styles.remove}>X</button>
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <label className={styles.label}>Роли</label>
                <div className={styles.tags}>
                    <div className={styles.tag}>
                        <span>Организатор</span>
                        <button className={styles.remove}>X</button>
                    </div>
                    <div className={styles.tag}>
                        <span>Волонтер</span>
                        <button className={styles.remove}>X</button>
                    </div>
                    <div className={styles.tag}>
                        <span>Спикер</span>
                        <button className={styles.remove}>X</button>
                    </div>
                    <div className={styles.tag}>
                        <span>Технический специалист</span>
                        <button className={styles.remove}>X</button>
                    </div>
                </div>
            </div>

            <div>
                <div className={styles.limitRow}>
                    <label className={styles.checkboxWrap}>
                        <input type="checkbox" className={styles.checkbox} />
                        Установить макс. количество участников
                    </label>

                    <div className={styles.counter}>
                        <label htmlFor="participantsLimit" className={styles.label}>
                            Ограничение
                        </label>
                        <input
                            type="number"
                            id="participantsLimit"
                            className={styles.counterInput}
                            defaultValue={250}
                            min={0}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default PositioningForm;
